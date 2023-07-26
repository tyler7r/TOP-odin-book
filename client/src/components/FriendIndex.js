import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DisplayUsers } from './DisplayUsers';
import { GuestDisplayUsers } from './GuestViews/GuestDisplayUsers';
import { Header } from './Header';
import { GuestHeader } from './GuestViews/GuestHeader';
import { FriendSearch } from './FriendSearch';

export const FriendIndex = (props) => {
    const { userId } = useParams();
    const { user, token, isGuest } = props;
    const [friends, setFriends] = useState(null);
    const [skip, setSkip] = useState(0);

    const fetchFriends = async() => {
        await fetch(`/odinbook/users/${userId}/friends?skip=${skip}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(res => res.json())
            .then(data => {
                if (friends === null) {
                    setFriends(data.friends)
                } else {
                    setFriends([...friends, ...data.friends])
                }
            })
    }

    useEffect(() => {
        if (token !== null) {
            fetchFriends()
        }
    }, [token, skip])

    return (
        <>
            {isGuest === false
            ? <>
                <Header token={token} user={user} />
                <FriendSearch setUsers={setFriends} token={token} user={user} userId={userId} />
                <DisplayUsers user={user} token={token} users={friends} setUsers={setFriends} setSkip={setSkip} />
            </>
            : <> 
                <GuestHeader token={token} />
                <FriendSearch setUsers={setFriends} token={token} user={user} userId={userId} />
                <GuestDisplayUsers token={token} user={user} />
            </>
            }
        </>
    )
}