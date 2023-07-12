import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GuestDisplayPosts } from './GuestDisplayPosts';

export const GuestProfile = (props) => {
    const { userId } = useParams();
    const { token, user } = props;
    const [profileData, setProfileData] = useState(null);
    const [profilePosts, setProfilePosts] = useState(null);

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
                setProfileData(data.data);
                setProfilePosts(data.posts);
            })
    }

    return (
        <>
            <Link to='/odinbook'>Back Home</Link>
            {profilePosts !== null &&
                <>
                    {profileData.profilePic === undefined ? '' : <img src={profileData.profilePic} height={100} width={100} alt='profilePic'/>}
                    {profileData.profileBio === undefined ? '' : <div>{profileData.profileBio}</div>}
                    <h1>{profileData.fullName}</h1>
                    <div>Friends: {profileData.friends.length}</div>
                    <GuestDisplayPosts token={token} user={user} posts={profilePosts} setPosts={setProfilePosts} />
                </>
            }
            {profilePosts === null &&
                <div>No user data found</div>
            }
        </>
    )
}

