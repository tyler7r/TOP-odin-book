import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DisplayPosts } from './DisplayPosts';

export const Profile = (props) => {
    const { userId } = useParams();
    const { token, user } = props;
    const [profileData, setProfileData] = useState(null);
    const [profilePosts, setProfilePosts] = useState(null);

    const fetchProfile = async () => {
        await fetch(`/odinbook/users/${userId}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setProfileData(data.data);
                setProfilePosts(data.posts);
            })
    }

    const isFriendWithUser = () => {
        if (user.friends.includes(profileData._id)) {
            return true
        } else return false
    }

    const friendStatus = () => {
        if (isFriendWithUser() === true) {
            return 'Friend'
        }
        if (user.sentRequests.includes(profileData._id)) {
            return 'Pending Request'
        } else if (!user.sentRequests.includes(profileData._id) && isFriendWithUser() === false) {
            return 'Not Friend'
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [userId])

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
                        <button>Send Friend Request</button>
                    }
                    {friendStatus() === 'Pending Request' &&
                        <button>Request Sent</button>
                    }
                    {friendStatus() === 'Friend' &&
                        <button>Friends</button>
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