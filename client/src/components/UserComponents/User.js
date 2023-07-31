import React from 'react'
import { Link } from 'react-router-dom';
import { Relationship } from './Relationship';
import { userInitials } from '../../HelperFunctions/UserInitials';
import '../../styles/user.css'

export const User = (props) => {
    const { token, user, users, setUsers, currentUser } = props

    return (
        <div className='user'>
            <Link to={`/odinbook${user.url}`}>{user.profilePic === undefined ? userInitials(user) : <img src={user.profilePic} alt='profile pic' height={50} width={50} />}</Link>
            <Link to={`/odinbook${user.url}`}>{user.fullName} @{user.username}</Link>
            <Relationship token={token} users={users} setUsers={setUsers} currentUser={currentUser} user={user} />
        </div>
    )
}