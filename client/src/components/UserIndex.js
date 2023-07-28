import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { DisplayUsers } from './DisplayUsers';
import { SearchIndexes } from './SearchIndexes';

export const UserIndex = (props) => {
    const { token, user } = props;
    const [index, setIndex] = useState(null);
    const [mode, setMode] = useState('all');
    const [search, setSearch] = useState('')
    const [skip, setSkip] = useState(0);

    const getUsers = async () => {
        await fetch(`/odinbook/users/index?skip=${skip}&mode=${mode}&search=${search}`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (index === null) {
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
    }, [token, skip])

    useEffect(() => {
        setIndex(null);
        setSkip(0)
    }, [search])

    return (
        <>
            <Header user={user} />
            <SearchIndexes mode={mode} setMode={setMode} setSearch={setSearch} token={token} />
            {index !== null
                ? <DisplayUsers token={token} user={user} setUsers={setIndex} users={index} setSkip={setSkip} />
                : <div>No users found</div>
            }
        </>
    )
}
