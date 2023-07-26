import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Home.css'

export const GuestDisplayUsers = (props) => {
    const { token, users, setUsers, setSkip } = props;

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(users.length + 1);
        }
        console.log(offsetHeight + scrollTop, scrollHeight)
    }

    return (
        <div className='feed' onScroll={handleScroll}>
            <h2>Users</h2>
            {users !== null &&
                users.map(indexedUser => {
                    return (
                        <div key={indexedUser._id} className='user'>
                            <Link to={`/odinbook${indexedUser.url}`}>{indexedUser.profilePic === null ? '' : <img src={indexedUser.profilePic} alt='profile pic' height={50} width={50} />}</Link>
                            <Link to={`/odinbook${indexedUser.url}`}>{indexedUser.fullName} @{indexedUser.username}</Link>
                        </div>
                    )
                })
            }
            {(users === null || users.length === 0) && 
                <div>No users to display</div>
            }
        </div>
    )
}