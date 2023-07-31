import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { DisplayUsers } from './DisplayUsers';
import { SearchIndexes } from './SearchIndexes';

export const UserIndex = (props) => {
    const { } = props;
    const [index, setIndex] = useState(null);
    const [mode, setMode] = useState('all');
    const [search, setSearch] = useState('');
    const [skip, setSkip] = useState(0);

    const getUsers = async () => {
        await fetch(`/odinbook/g/users/index?skip=${skip}&mode=${mode}&search=${search}`, {
            method: 'get',
            headers: {
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
        getUsers()
    }, [skip, mode])

    useEffect(() => {
        setIndex(null);
        setSkip(0);
    }, [search])

    return (
        <div>
            <Header />
            <SearchIndexes mode={mode} setMode={setMode} setSearch={setSearch} />
            {index !== null
                ? <DisplayUsers users={index} setSkip={setSkip} />
                : <div>No users found</div>
            }
        </div>
    )
}