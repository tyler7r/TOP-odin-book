import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../HelperFunctions/FormatDate'
import { userInitials } from '../../HelperFunctions/UserInitials'
import { isProfilePicAvailable } from '../../HelperFunctions/CheckForProfilePic'
import '../../styles/comment.css'

export const Comment = (props) => {
    const { comment } = props

    const redirectGuest = () => {
        window.location.href = process.env.REACT_APP_MAIN_URL;
    }

    return (
        <div className='comment'>
            <Link className='comment-author-pfp-container' to={`/odinbook/g${comment.author.url}`}>
                {isProfilePicAvailable(comment.author) === false
                ? <div className='user-initials'>{userInitials(comment.author)}</div> 
                : <img className='comment-author-pfp' src={comment.author.profilePic} alt='profilePic' />}
            </Link>
            <Link className='comment-author-container' to={`/odinbook/g${comment.author.url}`}>
                <div className='comment-author-name'>{comment.author.fullName}</div>
                <div className='comment-author-username'>{comment.author.username} // {formatDate(comment.time)}</div>
            </Link>
            <div className='comment-details'>
                <div className='comment-text'>{comment.text}</div>
            </div>
            <div className='comment-interaction-container'>
                <div className='like-post-container'>
                    <img src={require('../../images/heart.png')} onClick={() => redirectGuest()} className='like-icon' />
                    <div className='like-amount'>{comment.likes.length}</div>
                </div>
            </div>
        </div>
    )
}