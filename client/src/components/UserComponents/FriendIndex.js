import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DisplayUsers } from './DisplayUsers';
import { Header } from '../Header';
import { SearchIndexes } from './SearchIndexes';

export const FriendIndex = (props) => {
    const { userId } = useParams();
    const { server, user, token } = props;
    const [viewedUser, setViewedUser] = useState(null);
    const [friends, setFriends] = useState(null);
    const [search, setSearch] = useState('')
    const [mode, setMode] = useState('all');
    const [skip, setSkip] = useState(0);

    const fetchFriends = async() => {
        await fetch(`${server}/odinbook/users/${userId}/friends?skip=${skip}&mode=${mode}&search=${search}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(res => res.json())
            .then(data => {
                if (friends === null || skip === 0) {
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
    }, [token, skip, search])

    useEffect(() => {
        setSkip(0);
    }, [search, mode])

    return (
        <div>
            <Header token={token} user={user} />
            {viewedUser !== null &&
                <div className='friend-index-title-container'>
                    <Link to={`/odinbook${viewedUser.url}`} className='friend-index-title-name'>{viewedUser.fullName}'s</Link>
                    <div className='friend-index-title'>Friends List</div>
                </div>
            }
            <SearchIndexes view={'friends'} mode={mode} setMode={setMode} setSearch={setSearch} token={token} setSkip={setSkip} />
            <DisplayUsers user={user} token={token} users={friends} setUsers={setFriends} setSkip={setSkip} />
        </div>
    )
}