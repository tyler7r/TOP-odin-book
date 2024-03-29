import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../Header';
import { ProfileHeader } from './ProfileHeader';
import { DisplayPosts } from '../PostComponents/DisplayPosts';

export const OtherUserProfile = (props) => {
    const { userId } = useParams();
    const { server, token, user } = props;
    const [profileData, setProfileData] = useState(null);
    const [profilePosts, setProfilePosts] = useState(null);
    const [skip, setSkip] = useState(0);

    const fetchPosts = async() => {
        await fetch(`${server}/odinbook/users/${userId}?skip=${skip}`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setProfileData(data.data);
                if (skip === 0) {
                    setProfilePosts(data.posts)
                } else {
                    setProfilePosts([...profilePosts, ...data.posts])
                }
            })
    }

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
        await fetch(`${server}/odinbook/${userId}/request`, {
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
        await fetch(`${server}/odinbook/${userId}/unfriend`, {
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
            <Header server={server} user={user} />
            {profileData !== null
            ? <div className='profile-header-container'>
                <ProfileHeader profileData={profileData} />
                {friendStatus() === 'Not Friend' && 
                    <button className='profile-friend-status-btn' onClick={() => friendRequestButton()}>Send Friend Request</button>
                }
                {friendStatus() === 'Pending Request' &&
                    <button className='profile-friend-status-btn' onClick={() => friendRequestButton()}>Request Sent</button>
                }
                {friendStatus() === 'Friend' &&
                    <button className='profile-friend-status-btn unfriend-btn' onClick={() => unfriendUser()}>Unfriend</button>
                }
            </div>
            : <div>No user data found</div>
            }
            {(profilePosts !== null && profilePosts.length !== 0)
                ? <div className='profile-feed'><DisplayPosts server={server} token={token} user={user} posts={profilePosts} setPosts={setProfilePosts} setSkip={setSkip} /></div>
                : <div className='no-items-msg'>No posts found</div>
            }
        </>
    )
}