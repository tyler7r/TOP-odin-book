import React from 'react';
import { Link } from 'react-router-dom';
import { isProfilePicAvailable } from '../../HelperFunctions/CheckForProfilePic';
import { userInitials } from '../../HelperFunctions/UserInitials';
import '../../styles/home.css'
import '../../styles/user.css'

export const DisplayUsers = (props) => {
    const { users, setSkip } = props;

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if ((offsetHeight + scrollTop + 50) >= scrollHeight) {
            setSkip(users.length);
        }
    }

    return (
        <div className='users-container'>
            <div className='feed-title'>Users</div>
            <div className='users-feed' onScroll={handleScroll}>
                {users !== null &&
                    users.map(indexedUser => {
                        return (
                            <div key={indexedUser._id} className='user'>
                                <Link className='user-pfp-container' to={`/odinbook/g${indexedUser.url}`}>{isProfilePicAvailable(indexedUser) === false 
                                ? <div className='user-user-initials'>{userInitials(indexedUser)}</div>
                                : <img className='user-profile-pic' src={indexedUser.profilePic} alt='profile pic' />}
                                </Link>
                                <Link className='user-name-container' to={`/odinbook/g${indexedUser.url}`}>
                                    <div className='user-fullName'>{indexedUser.fullName}</div>
                                    <div className="user-username">@{indexedUser.username}</div>
                                </Link>
                                <Link to={`/odinbook/g/users/${indexedUser._id}/friends`} className='user-friends-btn'>Friends: {indexedUser.friends.length}</Link>
                            </div>
                        )
                    })
                }
            </div>
            {(users === null || users.length === 0) && 
                <div>No users to display</div>
            }
        </div>
    )
}