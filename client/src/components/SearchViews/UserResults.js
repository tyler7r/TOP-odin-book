import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { DisplayUsers } from '../DisplayUsers';

export const UserResults = (props) => {
    const search = useParams();
    const { token, user, view } = props;
    const [users, setUsers] = useState(null);
    const [skip, setSkip] = useState(0);

    const fetchUsers = async () => {
        try {
            await fetch(`/odinbook/search/${search.topic}?skip=${skip}&view=${view}`, {
                method: 'get',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                    if (users !== null) {
                        setUsers([...users, ...data.users])
                    } else {
                        setUsers(data.users)
                    }
                })
        } catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        if (token !== null) {
            fetchUsers();
        }
    }, [token, skip]);

    return (
        <>
            {users !== null 
                ? <DisplayUsers user={user} token={token} setSkip={setSkip} users={users} setUsers={setUsers} />
                : <div>No users found</div>
            }
        </>
    )
}