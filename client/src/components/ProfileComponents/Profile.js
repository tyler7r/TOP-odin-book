import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CurrentUserProfile } from './CurrentUserProfile';
import { Header } from '../Header';
import { ProfileHeader } from './ProfileHeader';
import { OtherUserProfile } from './OtherUserProfile';

export const Profile = (props) => {
    const { userId } = useParams();
    const { token, user } = props;
    const [profileData, setProfileData] = useState(null);
    const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);

    const fetchProfile = async () => {
        await fetch(`/odinbook/users/${userId}`, {
            method: 'get',
            headers: {
                'Authorization': token,
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
        <div>
            <Header user={user} />
            {profileData !== null &&
                <ProfileHeader profileData={profileData} />
            }
            {isCurrentUserProfile === true 
            ? <CurrentUserProfile token={token} user={user} profileData={profileData} setProfileData={setProfileData} />
            : <OtherUserProfile token={token} user={user} profileData={profileData} setProfileData={setProfileData} />
            }
        </div>
    )
}