import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { DisplayUsers } from './DisplayUsers';
import { Header } from './Header';
import { SearchIndexes } from './SearchIndexes';
// import { FriendSearch } from './FriendSearch';

export const FriendIndex = (props) => {
    const { userId } = useParams();
    const { } = props;
    const [viewedUser, setViewedUser] = useState(null);
    const [friends, setFriends] = useState(null);
    const [mode, setMode] = useState('all');
    const [search, setSearch] = useState('');
    const [skip, setSkip] = useState(0);

    const fetchFriends = async() => {
        await fetch(`/odinbook/g/users/${userId}/friends?skip=${skip}&mode=${mode}&search=${search}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
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
        fetchFriends()
    }, [skip])

    useEffect(() => {
        setFriends(null)
        setSkip(0)
    }, [search])

    return (
        <>
            <Header />
            {viewedUser !== null &&
                <>
                    <Link to={`/odinbook/g${viewedUser.url}`}>Back</Link>
                    <h2>{viewedUser.fullName}'s Friends List</h2>
                </>
            }
            <SearchIndexes mode={mode} setMode={setMode} setSearch={setSearch} />
            <DisplayUsers users={friends} setSkip={setSkip} />
        </>
    )
}