import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { DisplayUsers } from './DisplayUsers';
import { SearchIndexes } from './SearchIndexes';

export const UserIndex = (props) => {
    const { server, token, user } = props;
    const [index, setIndex] = useState(null);
    const [mode, setMode] = useState('all');
    const [search, setSearch] = useState('')
    const [skip, setSkip] = useState(0);

    const getUsers = async () => {
        await fetch(`${server}/odinbook/users/index?skip=${skip}&mode=${mode}&search=${search}`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (skip === 0) {
                    setIndex(data.users);
                } else {
                    setIndex([...index, ...data.users])
                }
            })
    }

    useEffect(() => {
        if (token !== null) {
            getUsers()
        }
    }, [token, skip, search])

    useEffect(() => {
        setSkip(0)
    }, [search, mode]);

    return (
        <div>
            <Header user={user} />
            <SearchIndexes view={'users'} mode={mode} setMode={setMode} setSearch={setSearch} token={token} setSkip={setSkip} />
            {index !== null
                ? <DisplayUsers token={token} user={user} setUsers={setIndex} users={index} setSkip={setSkip} />
                : <div>No users found</div>
            }
        </div>
    )
}
