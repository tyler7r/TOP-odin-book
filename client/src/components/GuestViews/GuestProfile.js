import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GuestDisplayPosts } from './GuestDisplayPosts';
import { GuestHeader } from './GuestHeader';

export const GuestProfile = (props) => {
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

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(profilePosts.length)
        }
    }

    return (
        <div className='feed' onScroll={handleScroll}>
            <GuestHeader user={user} />
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
        </div>
    )
}

