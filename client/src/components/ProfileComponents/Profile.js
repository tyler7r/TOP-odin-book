import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CurrentUserProfile } from './CurrentUserProfile';
import { OtherUserProfile } from './OtherUserProfile';

export const Profile = (props) => {
    const { userId } = useParams();
    const { server, token, user } = props;
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
            {isCurrentUserProfile === true 
            ? <CurrentUserProfile server={server} token={token} user={user} />
            : <OtherUserProfile server={server} token={token} user={user} />
            }
        </div>
    )
}