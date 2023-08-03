import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { userInitials } from '../../HelperFunctions/UserInitials';
import '../../styles/profile-header.css'

export const ProfileHeader = (props) => {
    const { userId } = useParams()
    const { profileData } = props;

    return (
        <div className='profile-header'>
            {profileData.profilePic === undefined ? <div className='profile-user-initials'>{userInitials(profileData)}</div> : <img src={profileData.profilePic} className='profile-pic' height={100} width={100} alt='profilePic'/>}
            <h1 className='profile-header-name'>{profileData.fullName}</h1>
            <Link className='profile-friends-btn' to={`/odinbook/users/${userId}/friends`}>Friends: {profileData.friends.length}</Link>
            {profileData.profileBio === undefined ? '' : <div className='profile-bio'>{profileData.profileBio}</div>}
        </div>
    )
}