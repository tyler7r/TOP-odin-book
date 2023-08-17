import React from 'react';
import { Link } from 'react-router-dom';
import { userInitials } from '../../HelperFunctions/UserInitials';
import '../../styles/home.css'
import '../../styles/user.css'
import { User } from './User';

export const DisplayUsers = (props) => {
    const { server, token, user, users, setUsers, setSkip } = props;

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if ((offsetHeight + scrollTop + 50) >= scrollHeight) {
            setSkip(users.length)
        }
    }

    return (
        <div className='users-container'>
            <h2 className='feed-title'>Users</h2>
            <div className='users-feed' onScroll={handleScroll}>
                {users !== null &&
                    users.map(indexedUser => {
                        return (
                            <User server={server} key={indexedUser._id} token={token} user={user} indexedUser={indexedUser} users={users} setUsers={setUsers} />
                        )
                    })
                }
                {(users === null || users.length === 0) &&
                    <div className='no-items-msg'>No users to display</div>
                }
            </div>
        </div>
    )
}