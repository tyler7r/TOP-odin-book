import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DisplayPosts } from './DisplayPosts';
import { Header } from './Header';
import { ProfileHeader } from './ProfileHeader';

export const Profile = (props) => {
    const { userId } = useParams();
    const { token, user } = props;
    const [profileData, setProfileData] = useState(null);
    const [profilePosts, setProfilePosts] = useState(null);
    const [skip, setSkip] = useState(0)

    useEffect(() => {
        fetchProfile();
    }, [userId, skip])

    const fetchProfile = async () => {
        await fetch(`/odinbook/users/${userId}?skip=${skip}`, {
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
            <Header user={user} />
            {profilePosts !== null &&
                <>
                    <ProfileHeader profileData={profileData} />
                    <DisplayPosts setSkip={setSkip} token={token} user={user} posts={profilePosts} setPosts={setProfilePosts} />
                </>
            }
            {profilePosts === null &&
                <div>No user data found</div>
            }
        </>
    )
}

