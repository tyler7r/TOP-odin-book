import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DisplayPosts } from './DisplayPosts';
import { ProfileInfo } from './ProfileInfo';
import { NewPost } from './NewPost';

export const Profile = (props) => {
    const { userId } = useParams();
    const { token, user, setUser, setUpdateUser, isGuest, posts, setPosts } = props;
    const [profileData, setProfileData] = useState(null);
    const [profilePosts, setProfilePosts] = useState(null);
    const [requests, setRequests] = useState(null);
    const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
    const [editProfileModal, setEditProfileModal] = useState(false);
    const [formData, setFormData] = useState('');

    useEffect(() => {
        fetchProfile();
    }, [userId])

    const fetchProfile = async () => {
        await fetch(`/odinbook/users/${userId}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (user) {
                    if (user._id === data.data._id) setIsCurrentUserProfile(true)
                };
                setProfileData(data.data);
                setProfilePosts(data.posts);
                setRequests(data.receivedRequests);
                setFormData({...formData, bio: data.data.profileBio });
            })
    }

    const isFriendWithUser = () => {
        let friends = profileData.friends;
        if (friends.some(friend => friend._id === user._id)) {
            return true
        } else return false
    }

    const friendStatus = () => {
        let receivedRequests = profileData.receivedRequests;

        if (isFriendWithUser() === true) {
            return 'Friend'
        }
        if (receivedRequests.some(request => request.sender === user._id)) {
            return 'Pending Request'
        } else if (user._id === profileData._id) {
            return 'User Profile'
        } else {
            return 'Not Friend'
        }
    }

    const friendRequestButton = async () => {
        await fetch(`/odinbook/${userId}/request`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(res => res.json())
            .then(data => {
                setProfileData({...profileData, 
                    receivedRequests: data.receivingUser.receivedRequests,
                    friends: data.receivingUser.friends,
                });
                setUpdateUser(true);
            })
    }

    const unfriendUser = async () => {
        await fetch(`/odinbook/${userId}/unfriend`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setProfileData({...profileData,
                    friends: data.profileUser.friends
                })
            })
    }

    const handleRequest = async (e, action) => {
        const requestId = e.target.id;
        await fetch(`/odinbook/${requestId}/${action}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(res => res.json())
            .then(data => {
                if (action === 'accept') setProfileData({...profileData, friends: data.receiver.friends})
                setRequests(data.receivedRequests);
                setUpdateUser(true)
            })
    }

    return (
        <>
            <Link to='/odinbook'>Back Home</Link>
            {(user !== null && isGuest === false) &&
                <Link style={{margin: '8px'}} to={`/odinbook${user.url}`}>{user.fullName}</Link>
            }
            {profilePosts !== null &&
                <>
                    {profileData.profilePic === undefined ? '' : <img src={profileData.profilePic} height={100} width={100} alt='profilePic'/>}
                    {profileData.profileBio === undefined ? '' : <div>{profileData.profileBio}</div>}
                    <h1>{profileData.fullName}</h1>
                    <div>Friends: {profileData.friends.length}</div>
                    {isGuest === false && 
                        (friendStatus() === 'Not Friend' && 
                            <button onClick={() => friendRequestButton()}>Send Friend Request</button>
                        )
                        (friendStatus() === 'Pending Request' &&
                            <button onClick={() => friendRequestButton()}>Request Sent</button>
                        )
                        (friendStatus() === 'Friend' &&
                            <button onClick={() => unfriendUser()}>Friends</button>
                        )
                    }
                    {editProfileModal === true && 
                        <ProfileInfo setEditProfileModal={setEditProfileModal} token={token} setProfileData={setProfileData} profileData={profileData} formData={formData} setFormData={setFormData} setUser={setUser} setUpdateUser={setUpdateUser} />
                    }
                    {(editProfileModal === false && user._id === profileData._id) && 
                        <>
                            <button onClick={() => setEditProfileModal(true)}>Edit Profile</button>
                            <h3>Friend Requests</h3>
                            {(requests !== null && isCurrentUserProfile === true) &&
                                requests.map(request => {
                                    return ( 
                                        <div key={request._id}>
                                            <Link to={`/odinbook/users/${request.sender._id}`}>{request.sender.fullName}</Link>
                                            <button id={request._id} onClick={(e) => handleRequest(e, 'accept')}>Accept</button>
                                            <button id={request._id} onClick={(e) => handleRequest(e, 'reject')}>Reject</button>
                                        </div>
                                    )
                                })
                            }
                        </>
                    }
                    {(requests !== null && isCurrentUserProfile === true) &&
                        requests.map(request => {
                            return ( 
                                <div key={request._id}>
                                    <Link to={`/odinbook/users/${request.sender._id}`}>{request.sender.fullName}</Link>
                                    <button id={request._id} onClick={(e) => handleRequest(e, 'accept')}>Accept</button>
                                    <button id={request._id} onClick={(e) => handleRequest(e, 'reject')}>Reject</button>
                                </div>
                            )
                        })
                    }
                    {isGuest === false && 
                        <>
                            <h3>New Post</h3>
                            <NewPost token={token} user={user} posts={profilePosts} setPosts={setProfilePosts}/>
                        </>
                    }
                    <DisplayPosts token={token} user={user} posts={profilePosts} setPosts={setProfilePosts} />
                </>
            }
            {profilePosts === null &&
                <div>No user data found</div>
            }
        </>
    )
}