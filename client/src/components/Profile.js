import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CurrentUserProfile } from './ProfileViews/CurrentUserProfile';
import { Header } from './Header';
import { ProfileHeader } from './ProfileViews/ProfileHeader';
import { OtherUserProfile } from './ProfileViews/OtherUserProfile';

export const Profile = (props) => {
    const { userId } = useParams();
    const { token, user } = props;
    const [profileData, setProfileData] = useState(null);
    const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);

    const fetchProfile = async () => {
        await fetch(`/odinbook/users/${userId}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (user) {
                    if (user._id === data.data._id) {
                        setIsCurrentUserProfile(true)
                    }
                    setProfileData(data.data);
                };
            })
    }

    useEffect(() => {
        fetchProfile();
    }, [userId, user])

    return (
        <>
            <Header user={user} />
            {profileData !== null &&
                <ProfileHeader profileData={profileData} />
            }
            {isCurrentUserProfile === true 
            ? <CurrentUserProfile token={token} user={user} profileData={profileData} setProfileData={setProfileData} />
            : <OtherUserProfile token={token} user={user} profileData={profileData} setProfileData={setProfileData} />
            }
        </>
    )
}