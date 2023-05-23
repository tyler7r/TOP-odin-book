import React, { useState, useEffect } from 'react'
import { NewComment } from './NewComment';

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
                            <div>{comment.text}</div>
                            <div>Likes: {comment.likes.length}</div>
                            <button id={comment._id} onClick={(e) => handleLike(e)}>Like Comment</button>
                            {comment.author === user._id &&
                                <button id={comment._id} onClick={(e) => handleDelete(e)}>Delete Comment</button>
                            }
                        </div>
                    )
                })
            }
            <NewComment user={user} postId={postId} token={token} setPosts={setPosts} setPostComments={setPostComments} postComments={postComments} />
        </>
    )
}