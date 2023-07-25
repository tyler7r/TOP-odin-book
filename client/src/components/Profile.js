import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GuestProfile } from './GuestViews/GuestProfile';
import { DisplayPosts } from './DisplayPosts';
import { CurrentUserProfile } from './CurrentUserProfile';
import { Header } from './Header';

export const Profile = (props) => {
    const { userId } = useParams();
    const { token, user, isGuest } = props;
    const [profileData, setProfileData] = useState(null);
    const [profilePosts, setProfilePosts] = useState(null);
    const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
    const [formData, setFormData] = useState('');
    const [skip, setSkip] = useState(0);

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
                setFormData({...formData, bio: data.data.profileBio });
            })
    }

    const fetchPosts = async () => {
        await fetch(`/odinbook/users/${userId}?skip=${skip}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (profilePosts === null) {
                    setProfilePosts(data.posts);
                } else {
                    setProfilePosts([...profilePosts, ...data.posts])
                }
            })
    }

    useEffect(() => {
        console.log('run');
        fetchProfile();
    }, [userId, user])

    useEffect(() => {
        fetchPosts()
    }, [skip])

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

    return (
        <>
            {isGuest === false 
            ? <>
                <Header user={user} />
                {profileData !== null &&
                    <>
                        {profileData.profilePic === undefined ? '' : <img src={profileData.profilePic} height={100} width={100} alt='profilePic'/>}
                        {profileData.profileBio === undefined ? '' : <div>{profileData.profileBio}</div>}
                        <h1>{profileData.fullName}</h1>
                        <div>Friends: {profileData.friends.length}</div> 
                    </>
                }
                {isCurrentUserProfile === true 
                ? <CurrentUserProfile token={token} user={user} />
                : <>
                    {profileData !== null
                    ? <>
                        {friendStatus() === 'Not Friend' && 
                            <button onClick={() => friendRequestButton()}>Send Friend Request</button>
                        }
                        {friendStatus() === 'Pending Request' &&
                            <button onClick={() => friendRequestButton()}>Request Sent</button>
                        }
                        {friendStatus() === 'Friend' &&
                            <button onClick={() => unfriendUser()}>Friends</button>
                        }
                    </>
                    : <div>No user data found</div>
                    }
                    {profilePosts !== null &&
                        <DisplayPosts token={token} user={user} posts={profilePosts} setPosts={setProfilePosts} />
                    }
                </>
                }
            </>
            : <GuestProfile token={token} user={user} />
            }
        </>
    )
}