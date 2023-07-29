import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../HelperFunctions/FormatDate'
import { userInitials } from '../../HelperFunctions/UserInitials'
import '../../styles/comment.css';

export const Comment = (props) => {
    const { comment, postId, posts, setPosts, token, user } = props

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
                console.log(copy);
                setPosts(copy);
            })
    }

    const handleDelete = async (e) => {
        const commentId = e.target.id;

        await fetch(`/odinbook/${postId}/${commentId}/delete`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                let copy = [...posts];
                let index = posts.findIndex(post => post._id === postId);
                copy[index] = data.post;
                setPosts(copy);
            })
    }

    return (
        <div className='comment'>
            <Link to={`/odinbook${comment.author.url}`}>{comment.author.profilePic === undefined ? userInitials(comment.author) : <img src={comment.author.profilePic} alt='profilePic' height={30} width={30} />}</Link>
            <Link to={`/odinbook${comment.author.url}`}><div>{comment.author.fullName}</div></Link>
            <div>{comment.text}</div>
            <div>{formatDate(comment.time)}</div>
            <div>Likes: {comment.likes.length}</div> 
            <button id={comment._id} onClick={(e) => handleLike(e)}>Like Comment</button>
            {comment.author._id === user._id &&
                <button id={comment._id} onClick={(e) => handleDelete(e)}>Delete Comment</button>
            }
        </div>
    )
}