import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { GuestDisplayUsers } from './GuestViews/GuestDisplayUsers';
import { GuestHeader } from './GuestViews/GuestHeader';
import { DisplayUsers } from './DisplayUsers';
import { IndexSearch } from './IndexSearch';

export const UserIndex = (props) => {
    const { token, user, isGuest } = props;
    const [index, setIndex] = useState(null);
    const [view, setView] = useState('all');
    const [clearSearch, setClearSearch] = useState(false);
    const [skip, setSkip] = useState(0);

    const getUsers = async () => {
        await fetch(`/odinbook/users/index?skip=${skip - 1}`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (clearSearch === true) {
                    setIndex(data.users)
                    setClearSearch(false)
                    return
                }
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
        if (clearSearch === true) {
            getUsers()
        }
    }, [clearSearch])

    return (
        <div>
            {isGuest === true 
            ? <>
                <GuestHeader token={token} />
                <IndexSearch user={user} token={token} setUsers={setIndex} setClearSearch={setClearSearch} view={view} setView={setView} />
                <GuestDisplayUsers token={token} user={user} setSkip={setSkip} users={index} setUsers={setIndex} />
            </>
            : <>
                <Header user={user} />
                <IndexSearch user={user} token={token} setUsers={setIndex} setClearSearch={setClearSearch} view={view} setView={setView} />
                {index !== null
                    ? <DisplayUsers token={token} user={user} setUsers={setIndex} users={index} setSkip={setSkip} />
                    : <div>No users found</div>
                }
            </>
            }
        </div>
    )
}
