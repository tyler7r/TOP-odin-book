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
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        if (token !== null) {
            getUsers()
        }
    }, [token])

    const getUsers = async () => {
        await fetch(`/odinbook/users/index?skip=${skip}`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setIndex(data.users);
            })
    }

    return (
        <div>
            {isGuest === true 
            ? <>
                <GuestHeader token={token} />
                <IndexSearch user={user} token={token} setUsers={setIndex} />
                <GuestDisplayUsers token={token} user={user} />
            </>
            : <>
                <Header user={user} />
                <IndexSearch user={user} token={token} setUsers={setIndex} />
                <h2>Users</h2>
                {index !== null
                    ? <DisplayUsers token={token} user={user} setUsers={setIndex} users={index} setSkip={setSkip} />
                    : <div>No users found</div>
                }
            </>
            }
        </div>
    )
}
