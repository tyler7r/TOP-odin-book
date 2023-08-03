import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DeleteCommentModal } from './DeleteCommentModal'
import { formatDate } from '../../HelperFunctions/FormatDate'
import { userInitials } from '../../HelperFunctions/UserInitials'
import '../../styles/comment.css';

export const Comment = (props) => {
    const { comment, postId, posts, setPosts, token, user } = props
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleLike = async (e) => {
        const commentId = e.target.id;

        await fetch(`/odinbook/${postId}/${commentId}/like`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                let copy = [...posts];
                let index = copy.findIndex(post => post._id === postId);
                copy[index] = data.post;
                setPosts(copy);
            })
    }

    const checkIfAuthor = (post) => {
        if (post.author._id === user._id) {
            return true
        }
    }

    const checkIfLiked = (post) => {
        if (post.likes.includes(user._id)) {
            return 'like-icon liked'
        } else {
            return 'like-icon'
        }
    }

    return (
        <div className='comment'>
            <Link className='comment-author-pfp-container' to={`/odinbook${comment.author.url}`}>{comment.author.profilePic === undefined ? <div className='user-initials'>{userInitials(comment.author)}</div> : <img src={comment.author.profilePic} className='comment-author-pfp' alt='profilePic' />}</Link>
            <Link to={`/odinbook${comment.author.url}`} className='comment-author-container'>
                <div className='comment-author-name'>{comment.author.fullName}</div>
                <div className='comment-author-username'>@{comment.author.username} // {formatDate(comment.time)}</div>
            </Link>
            <div className='comment-details'>
                <div className="comment-text">{comment.text}</div>
            </div>
            <div className='comment-interaction-container'>
                <div className="like-post-container">
                    <img src={require('../../images/heart.png')} className={checkIfLiked(comment)} id={comment._id} onClick={(e) => handleLike(e)} />
                    <div className='like-amount'>{comment.likes.length}</div>
                </div>
                {checkIfAuthor(comment) &&
                    <img className='delete-icon' src={require('../../images/trash.png')} id={comment._id} onClick={() => setDeleteModalOpen(true)} />
                }
                {deleteModalOpen && 
                    <DeleteCommentModal posts={posts} setPosts={setPosts} comment={comment} postId={postId} deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} token={token} />
                }
            </div>
        </div>
    )
}

{/* <div className='post-info'>
            <Link className='post-author-pfp-container' to={`/odinbook${post.author.url}`}>{post.author.profilePic === undefined ? userInitials(post.author) : <img src={post.author.profilePic} alt='profile pic' className='post-author-pfp' />}</Link>
            <Link to={`/odinbook${post.author.url}`} className="post-author-container">
                <div className='post-author-name'>{post.author.fullName}</div>
                <div className='post-author-username'>@{post.author.username} // {formatDate(post.time)}</div>
            </Link>
            <div className="post-details" onClick={() => expandThePost()}>
                <div className='post-text'>{post.text}</div>
                {(post.image !== undefined && post.image !== '') ? <img className='post-image' src={post.image} alt='postImage' /> : ''}
            </div>
            <div className="post-interaction-container">
                <div className='like-post-container'>
                    <img src={require('../../images/heart.png')} className={checkIfLiked(post)} id={post._id} onClick={(e) => handleLike(e)} />
                    <div className='like-amount'>{post.likes.length}</div>
                </div>
                <div className='comment-post-container'>
                    <img src={require('../../images/comment.png')} className='comment-icon' onClick={() => expandThePost()} />
                    <div className='comment-amount'>{post.comments.length}</div>
                </div>
                {checkIfAuthor(post) &&
                    <img className='delete-icon' src={require('../../images/trash.png')} id={post._id} onClick={() => setDeleteModalOpen(true)} />
                }
                {deleteModalOpen && 
                    <DeleteModal posts={posts} setPosts={setPosts} post={post} postId={postId} deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} token={token} />
                }
            </div>
        </div> */}