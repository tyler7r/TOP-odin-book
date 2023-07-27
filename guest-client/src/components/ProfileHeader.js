import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export const ProfileHeader = (props) => {
    const { userId } = useParams()
    const { profileData } = props;

    return (
        <>
            {profileData.profilePic === undefined ? '' : <img src={profileData.profilePic} height={100} width={100} alt='profilePic'/>}
            {profileData.profileBio === undefined ? '' : <div>{profileData.profileBio}</div>}
            <h1>{profileData.fullName}</h1>
            <Link to={`/odinbook/g/users/${userId}/friends`}>Friends: {profileData.friends.length}</Link>
        </>
    )
}