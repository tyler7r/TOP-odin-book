import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { DisplayUsers } from './DisplayUsers';
import { SearchIndexes } from './SearchIndexes';

export const UserIndex = (props) => {
    const { server } = props;
    const [index, setIndex] = useState(null);
    const [mode, setMode] = useState('all');
    const [search, setSearch] = useState('');
    const [skip, setSkip] = useState(0);

    const getUsers = async () => {
        await fetch(`${server}/odinbook/g/users/index?skip=${skip}&mode=${mode}&search=${search}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                console.log(index);
                if (index === null) {
                    setIndex(data.users);
                } else {
                    setIndex([...index, ...data.users])
                }
            })
    }

    useEffect(() => {
        getUsers()
    }, [skip])

    useEffect(() => {
        setIndex(null);
        setSkip(0);
    }, [search, mode]);

    return (
        <div>
            <Header />
            <SearchIndexes view={'users'} mode={mode} setMode={setMode} setSearch={setSearch} setSkip={setSkip} />
            {index !== null
                ? <DisplayUsers users={index} setSkip={setSkip} />
                : <div>No users found</div>
            }
        </div>
    )
}