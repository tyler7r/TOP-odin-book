import React from 'react'
import { Link } from 'react-router-dom';
import { Relationship } from './Relationship';
import { userInitials } from '../../HelperFunctions/UserInitials';
import { isProfilePicAvailable } from '../../HelperFunctions/CheckForProfilePic';
import '../../styles/user.css'

export const User = (props) => {
    const { token, indexedUser, users, setUsers, user } = props

    return (
        <div className='user'>
            <Link to={`/odinbook${indexedUser.url}`} className='user-pfp-container'>
                {isProfilePicAvailable(indexedUser) === false 
                ? <div className='user-user-initials'>{userInitials(indexedUser)}</div> 
                : <img className='user-profile-pic' src={indexedUser.profilePic} alt='profile pic' />}
            </Link>
            <Link to={`/odinbook${indexedUser.url}`} className='user-name-container'>
                <div className="user-fullName">{indexedUser.fullName}</div> 
                <div className="user-username">@{indexedUser.username}</div>
            </Link>
            <Link to={`/odinbook/users/${indexedUser._id}/friends`} className='user-friends-btn'>Friends: {indexedUser.friends.length}</Link>
            <Relationship token={token} users={users} setUsers={setUsers} user={user} indexedUser={indexedUser} />
        </div>
    )
}