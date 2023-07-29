import React from 'react';
import { Link } from 'react-router-dom';
import { userInitials } from '../../HelperFunctions/UserInitials';
import '../../styles/home.css'
import '../../styles/user.css'
import { User } from './User';

export const DisplayUsers = (props) => {
    const { token, user, users, setUsers, setSkip } = props;

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if ((offsetHeight + scrollTop + 50) >= scrollHeight) {
            setSkip(users.length)
        }
    }

    return (
        <>
            <h2>Users</h2>
            <div className='feed' onScroll={handleScroll}>
                {users !== null &&
                    users.map(indexedUser => {
                        return (
                            <User key={indexedUser._id} token={token} currentUser={user} user={indexedUser} users={users} setUsers={setUsers} />
                        )
                    })
                }
                {(users === null || users.length === 0) &&
                    <div>No users to display</div>
                }
            </div>
        </>
    )
}