import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { DisplayUsers } from '../User/DisplayUsers';

export const UserResults = (props) => {
    const search = useParams();
    const { server, view } = props;
    const [users, setUsers] = useState(null);
    const [skip, setSkip] = useState(0);

    const fetchUsers = async () => {
        try {
            await fetch(`${server}/odinbook/g/search/${search.topic}?skip=${skip}&view=${view}`, {
                method: 'get',
                headers: {
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
        fetchUsers();
    }, [skip]);

    return (
        <div>
            {(users !== null && users.length !== 0)
                ? <DisplayUsers setSkip={setSkip} users={users} />
                : <div className='no-items-msg'>No users found</div>
            }
        </div>
    )
}