import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { DisplayUsers } from './DisplayUsers';
import { Header } from '../Header';
import { SearchIndexes } from './SearchIndexes';

export const FriendIndex = (props) => {
    const { userId } = useParams();
    const { server } = props;
    const [viewedUser, setViewedUser] = useState(null);
    const [friends, setFriends] = useState(null);
    const [mode, setMode] = useState('all');
    const [search, setSearch] = useState('');
    const [skip, setSkip] = useState(0);

    const fetchFriends = async() => {
        await fetch(`${server}/odinbook/g/users/${userId}/friends?skip=${skip}&mode=${mode}&search=${search}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
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
        fetchFriends()
    }, [skip, search])

    useEffect(() => {
        setSkip(0);
    }, [search, mode]);

    return (
        <div>
            <Header />
            {viewedUser !== null &&
                <div className='search-results-container'>
                    <Link className='search-results-keyword' to={`/odinbook/g${viewedUser.url}`}>{viewedUser.fullName}'s</Link>
                    <div className='search-results-msg'>Friends List</div>
                </div>
            }
            <SearchIndexes view={'friends'} mode={mode} setMode={setMode} setSearch={setSearch} setSkip={setSkip} />
            <DisplayUsers users={friends} setSkip={setSkip} />
        </div>
    )
}