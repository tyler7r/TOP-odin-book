import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DisplayUsers } from './DisplayUsers';
import { Header } from './Header';
import { SearchIndexes } from './SearchIndexes';

export const FriendIndex = (props) => {
    const { userId } = useParams();
    const { user, token } = props;
    const [viewedUser, setViewedUser] = useState(null);
    const [friends, setFriends] = useState(null);
    const [search, setSearch] = useState('')
    const [mode, setMode] = useState('all');
    const [skip, setSkip] = useState(0);

    const fetchFriends = async() => {
        await fetch(`/odinbook/users/${userId}/friends?skip=${skip}&mode=${mode}&search=${search}`, {
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
                setViewedUser(data.viewedUser);
            })
    }

    useEffect(() => {
        if (token !== null) {
            fetchFriends()
        }
    }, [token, skip])

    useEffect(() => {
        setFriends(null)
        setSkip(0);
    }, [search])

    return (
        <>
            <Header token={token} user={user} />
            {viewedUser !== null &&
                <h2>{viewedUser.fullName}'s Friends List</h2>
            }
            <SearchIndexes mode={mode} setMode={setMode} setSearch={setSearch} token={token} />
            <DisplayUsers user={user} token={token} users={friends} setUsers={setFriends} setSkip={setSkip} />
        </>
    )
}