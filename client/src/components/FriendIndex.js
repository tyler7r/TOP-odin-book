import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DisplayUsers } from './DisplayUsers';
import { Header } from './Header';
import { FriendSearch } from './FriendSearch';

export const FriendIndex = (props) => {
    const { userId } = useParams();
    const { user, token } = props;
    const [viewedUser, setViewedUser] = useState(null);
    const [friends, setFriends] = useState(null);
    const [view, setView] = useState('all');
    const [clearSearch, setClearSearch] = useState(false);
    const [skip, setSkip] = useState(0);

    const fetchFriends = async() => {
        await fetch(`/odinbook/users/${userId}/friends?skip=${skip - 1}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(res => res.json())
            .then(data => {
                if (clearSearch === true) {
                    setFriends(data.friends)
                    setClearSearch(false)
                    return
                }
                if (friends === null) {
                    setFriends(data.friends)
                } else {
                    setFriends([...friends, ...data.friends])
                }
                setViewedUser(data.viewedUser);
            })
    }

    useEffect(() => {
        if (token !== null) {
            fetchFriends()
        }
    }, [token, skip])

    useEffect(() => {
        if (clearSearch === true) {
            fetchFriends()
        }
    }, [clearSearch])

    return (
        <>
            <Header token={token} user={user} />
            {viewedUser !== null &&
                <h2>{viewedUser.fullName}'s Friends List</h2>
            }
            <FriendSearch setUsers={setFriends} token={token} user={user} userId={userId} setClearSearch={setClearSearch} view={view} setView={setView} />
            <DisplayUsers user={user} token={token} users={friends} setUsers={setFriends} setSkip={setSkip} />
        </>
    )
}