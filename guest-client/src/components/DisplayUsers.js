import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'
import '../styles/user.css'

export const DisplayUsers = (props) => {
    const { users, setSkip } = props;

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if ((offsetHeight + scrollTop + 50) >= scrollHeight) {
            setSkip(users.length);
        }
    }

    return (
        <>
            <h2>Users</h2>
            <div className='feed' onScroll={handleScroll}>
                {users !== null &&
                    users.map(indexedUser => {
                        return (
                            <div key={indexedUser._id} className='user'>
                                <Link to={`/odinbook${indexedUser.url}`}>{indexedUser.profilePic === undefined ? '' : <img src={indexedUser.profilePic} alt='profile pic' height={50} width={50} />}</Link>
                                <Link to={`/odinbook${indexedUser.url}`}>{indexedUser.fullName} @{indexedUser.username}</Link>
                            </div>
                        )
                    })
                }
            </div>
            {(users === null || users.length === 0) && 
                <div>No users to display</div>
            }
        </>
    )
}