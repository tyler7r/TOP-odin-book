import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DisplayPosts } from '../DisplayPosts';

export const OtherUserProfile = (props) => {
    const { userId } = useParams();
    const { token, user, setProfileData, profileData } = props;
    const [profilePosts, setProfilePosts] = useState(null);
    const [skip, setSkip] = useState(0);

    const fetchPosts = async() => {
        await fetch(`/odinbook/users/${userId}?skip=${skip}`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
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
                <DisplayPosts token={token} user={user} posts={profilePosts} setPosts={setProfilePosts} setSkip={setSkip} />
            }
        </>
    )
}