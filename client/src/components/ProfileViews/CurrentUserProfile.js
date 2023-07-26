import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProfileInfo } from './ProfileInfo';
import { DisplayPosts } from '../DisplayPosts';
import { NewPost } from '../NewPost';

export const CurrentUserProfile = (props) => {
    const { userId } = useParams();
    const { token, user, setProfileData, profileData } = props;
    const [profilePosts, setProfilePosts] = useState(null);
    const [requests, setRequests] = useState(null);
    const [editProfileModal, setEditProfileModal] = useState(false);
    const [formData, setFormData] = useState('');
    const [skip, setSkip] = useState(0);

    const fetchCurrentUserProfile = async () => {
        await fetch(`/odinbook/users/${userId}?skip=${skip}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setRequests(data.receivedRequests);
                setFormData({...formData, bio: data.data.profileBio });
                if (profilePosts === null) {
                    setProfilePosts(data.posts);
                } else {
                    setProfilePosts([...profilePosts, ...data.posts])
                }
            })
    }

    // const fetchPosts = async () => {
    //     console.log('fetchPosts');
    //     await fetch(`/odinbook/users/${userId}?skip=${skip}`, {
    //         method: 'get',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => res.json())
    //         .then(data => {
    //             if (profilePosts === null) {
    //                 setProfilePosts(data.posts);
    //             } else {
    //                 setProfilePosts([...profilePosts, ...data.posts])
    //             }
    //         })
    // }

    useEffect(() => {
        fetchCurrentUserProfile();
    }, [userId, user, skip])

    // useEffect(() => {
    //     fetchPosts()
    // }, [skip])

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
            })
    }

    return (
        <>
            {profilePosts !== null &&
                <>
                    {editProfileModal === false &&
                        <>
                            <button onClick={() => setEditProfileModal(true)}>Edit Profile</button>
                            <h3>Friend Requests</h3>
                            {requests !== null &&
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
                    {editProfileModal === true && 
                        <ProfileInfo setEditProfileModal={setEditProfileModal} token={token} setProfileData={setProfileData} profileData={profileData} formData={formData} setFormData={setFormData} />
                    }
                    <h3>New Post</h3>
                    <NewPost token={token} user={user} posts={profilePosts} setPosts={setProfilePosts}/>
                    <DisplayPosts token={token} user={user} posts={profilePosts} setPosts={setProfilePosts} setSkip={setSkip} />
                </>
            }
            {profilePosts === null &&
                <div>No user data found</div>
            }
        </>
    )
}