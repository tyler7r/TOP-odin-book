import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { DisplayComments } from './DisplayComments';
import { formatDate } from '../HelperFunctions/FormatDate'
import { userInitials } from '../HelperFunctions/UserInitials';

export const Post = (props) => {
    const { post, postId, posts } = props

    const handleClick = () => {
        window.location.href = `/odinbook/g/${postId}`
    }

    return (
        <div onClick={() => handleClick()}>
            <Link to={`/odinbook/g${post.author.url}`}>{post.author.profilePic === undefined ? userInitials(post.author) : <img src={post.author.profilePic} alt='profile pic' height={50} width={50} />}</Link>
            <Link to={`/odinbook/g${post.author.url}`}>{post.author.fullName} @{post.author.username}</Link>
            <div>{(post.image !== undefined && post.image !== '') ? <img src={post.image} alt='postImage' height={100} width={100} /> : ''} </div>
            <div>Post Details: {post.text}</div>
            <div>Post Date: {formatDate(post.time)}</div>
            <div>Likes: {post.likes.length}</div>
            <div>Comments: {post.comments.length}</div>
            <h3>Comments</h3>
            {/* <DisplayComments posts={posts} postId={postId} /> */}
            <div>=============================</div>
        </div>
    )
}