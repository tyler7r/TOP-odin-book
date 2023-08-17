import React from 'react'
import { Link } from 'react-router-dom';
import { formatDate } from '../../HelperFunctions/FormatDate'
import { userInitials } from '../../HelperFunctions/UserInitials';
import { isProfilePicAvailable } from '../../HelperFunctions/CheckForProfilePic';

export const Post = (props) => {
    const { host, post, postId } = props

    const handleClick = () => {
        window.location.href = `${host}/odinbook/g/${postId}`
    }

    const redirectGuest = () => {
        window.location.href = `http://localhost:3000/odinbook/login`
    }

    return (
        <div className='post-info'>
            <Link className='post-author-pfp-container' to={`/odinbook/g${post.author.url}`}>{isProfilePicAvailable(post.author) === false 
                ? <div className='user-initials'>{userInitials(post.author)}</div> 
                : <img className='post-author-pfp' src={post.author.profilePic} alt='profile pic' height={50} width={50} />}
            </Link>
            <Link to={`/odinbook/g${post.author.url}`} className='post-author-container'>
                <div className='post-author-name'>{post.author.fullName}</div>
                <div className='post-author-username'>@{post.author.username} // {formatDate(post.time)}</div>
            </Link>
            <div className='post-details' onClick={() => handleClick()}>
                <div className='post-text'>{post.text}</div>
                {(post.image !== undefined && post.image !== '') &&
                    <img className='post-image' src={post.image} alt='postImage' height={100} width={100} /> 
                }
            </div>
            <div className="post-interaction-container">
                <div className='like-post-container'>
                    <img alt='like-btn' className='like-icon' src={require('../../images/heart.png')} id={post._id} onClick={() => redirectGuest()} /> 
                    <div className="like-amount">{post.likes.length}</div>
                </div>
                <div className='comment-post-container'>
                    <img alt='comment-btn' className='comment-icon' src={require('../../images/comment.png')} id={post._id} onClick={() => redirectGuest()} />
                    <div className='comment-amount'>{post.comments.length}</div>
                </div>
            </div>
        </div>
    )
}