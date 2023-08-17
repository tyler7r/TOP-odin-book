import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { formatDate } from '../../HelperFunctions/FormatDate'
import { userInitials } from '../../HelperFunctions/UserInitials';
import { isProfilePicAvailable } from '../../HelperFunctions/CheckForProfilePic';
import { DeleteModal } from './DeletePostModal';

export const Post = (props) => {
    const { postId } = useParams();
    const { server, post, pId, posts, setPosts, token, user } = props;
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleLike = async (e) => {
        const pId = e.target.id;

        await fetch(`${server}/odinbook/${pId}/like`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                let copy = [...posts];
                let index = copy.findIndex(post => post._id === pId);
                copy[index] = data.post;
                setPosts([...copy]);
            })

    }

    const expandThePost = () => {
        window.location.href = `/odinbook/${pId}`
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
        <div className='post-info'>
            <Link className='post-author-pfp-container' to={`/odinbook${post.author.url}`}>{isProfilePicAvailable(post.author) === false ? <div className='user-initials'>{userInitials(post.author)}</div> : <img src={post.author.profilePic} alt='profile pic' className='post-author-pfp' />}</Link>
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
                    <DeleteModal server={server} posts={posts} setPosts={setPosts} post={post} postId={postId} deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} token={token} />
                }
            </div>
        </div>
    )
}