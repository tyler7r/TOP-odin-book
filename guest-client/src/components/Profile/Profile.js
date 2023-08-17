import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DisplayPosts } from '../Post/DisplayPosts';
import { Header } from '../Header';
import { ProfileHeader } from './ProfileHeader';

export const Profile = (props) => {
    const { userId } = useParams();
    const { server } = props;
    const [profileData, setProfileData] = useState(null);
    const [profilePosts, setProfilePosts] = useState(null);
    const [skip, setSkip] = useState(0)

    useEffect(() => {
        fetchProfile();
    }, [userId, skip])

    const fetchProfile = async () => {
        await fetch(`${server}/odinbook/g/users/${userId}?skip=${skip}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setProfileData(data.data);
                if (profilePosts === null) {
                    setProfilePosts(data.posts);
                } else {
                    setProfilePosts([...profilePosts, ...data.posts])
                }
            })
    }

    return (
        <div>
            <Header />
            {profilePosts !== null &&
                <>
                    <ProfileHeader profileData={profileData} />
                    <DisplayPosts setSkip={setSkip} posts={profilePosts} />
                </>
            }
            {profilePosts === null &&
                <div className='no-items-msg'>No user data found</div>
            }
        </div>
    )
}

