import React, { useState, useEffect } from 'react'
import { NewComment } from './NewComment';
import { Link } from 'react-router-dom';
import { formatDate } from '../HelperFunctions/FormatDate'
import { userInitials } from '../HelperFunctions/UserInitials';

export const DisplayComments = (props) => {
    const { posts, setPosts, postId, token, user } = props;
    const [postComments, setPostComments] = useState([]);

    useEffect(() => {
        let post = posts.find(post => post._id === postId);
        setPostComments(post.comments);
    }, [])

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
                setPostComments(data.post.comments);
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
                setPostComments(data.comments);
                let copy = [...posts];
                let index = posts.findIndex(post => post._id === postId);
                copy[index] = data.post;
                setPosts(copy);
            })
    }

    return (
        <>
            {postComments.length === 0 && 
                <div>No Comments</div>
            }
            {postComments.length > 0 &&
                postComments.map(comment => {
                    return (
                        <div key={comment._id}>
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
                })
            }
            <NewComment user={user} postId={postId} token={token} posts={posts} setPosts={setPosts} setPostComments={setPostComments} postComments={postComments} />
        </>
    )
}