import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const GuestDisplayUsers = (props) => {
    const { token } = props;
    const [index, setIndex] = useState(null);

    useEffect(() => {
        if (token !== null) {
            getUsers()
        }
    }, [token])

    const getUsers = async () => {
        await fetch(`/odinbook/users/index`, {
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
            <h2>Users</h2>
            {index !== null &&
                index.map(indexedUser => {
                    return (
                        <div key={indexedUser._id}>
                            <Link to={`/odinbook${indexedUser.url}`}>{indexedUser.fullName} @{indexedUser.username}</Link>
                        </div>
                    )
                })
            }
            {(index === null || index.length === 0) && 
                <div>No users to display</div>
            }
        </div>
    )
}