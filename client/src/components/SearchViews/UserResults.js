import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

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

    useEffect(() => {
        setSkip(0)
    }, [])

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(users.length)
        }
    }

    return (
        <>
            {token !== null &&
                <div className='feed' onScroll={handleScroll}>
                    {(users !== null && users.length !== 0) 
                        ? (users.map(user => {
                            return (
                                <div key={user._id}>
                                    {user.fullName}: {user.username}
                                </div>
                            )
                        }))
                        : <div>No users results</div>
                    }
                </div>
            }
        </>
    )
}