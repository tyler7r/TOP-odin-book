import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CurrentUserProfile } from './CurrentUserProfile';
import { Header } from '../Header';
import { OtherUserProfile } from './OtherUserProfile';

export const Profile = (props) => {
    const { userId } = useParams();
    const { token, user } = props;
    const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);

    const checkUser = async () => {
        if (user) {
            if (userId === user._id) {
                setIsCurrentUserProfile(true)
            } else {
                setIsCurrentUserProfile(false)
            }
        }
    }

    useEffect(() => {
        checkUser();
    }, [userId, user])

    return (
        <div>
            <Header user={user} />
            {isCurrentUserProfile === true 
            ? <CurrentUserProfile token={token} user={user} />
            : <OtherUserProfile token={token} user={user} />
            }
        </div>
    )
}