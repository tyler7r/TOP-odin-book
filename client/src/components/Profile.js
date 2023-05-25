import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DisplayPosts } from './DisplayPosts';

export const Profile = (props) => {
    const { userId } = useParams();
    const { token, user } = props;
    const [profileData, setProfileData] = useState(null);
    const [profilePosts, setProfilePosts] = useState(null);
    const [requests, setRequests] = useState(null);
    const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);

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
                console.log(data)
                setProfileData({...profileData, 
                    receivedRequests: data.receivingUser.receivedRequests,
                    friends: data.receivingUser.friends,
                });
            })
    }

    const handleRequest = async (e, action) => {
        const requestId = e.target.id
        await fetch(`/odinbook/${requestId}/${action}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (action === 'accept') setProfileData({...profileData, friends: data.receiver.friends})
                setRequests(data.receivedRequests);
            })
    }

    return (
        <>
            <Link to='/odinbook'>Back Home</Link>
            {user !== null &&
                <Link style={{margin: '8px'}} to={`/odinbook${user.url}`}>{user.fullName}</Link>
            }
            {profilePosts !== null &&
                <>
                    <h1>{profileData.fullName}</h1>
                    <div>Friends: {profileData.friends.length}</div>
                    {friendStatus() === 'Not Friend' && 
                        <button onClick={() => friendRequestButton()}>Send Friend Request</button>
                    }
                    {friendStatus() === 'Pending Request' &&
                        <button onClick={() => friendRequestButton()}>Request Sent</button>
                    }
                    {friendStatus() === 'Friend' &&
                        <button onClick={() => friendRequestButton()}>Friends</button>
                    }
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
                    <DisplayPosts token={token} user={user} posts={profilePosts} setPosts={setProfilePosts} />
                </>
            }
            {profilePosts === null &&
                <div>No user data found</div>
            }
        </>
    )
}