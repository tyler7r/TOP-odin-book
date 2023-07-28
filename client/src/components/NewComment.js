import React, { useState, useEffect } from 'react';

export const NewComment = (props) => {
    const { setPosts, posts, postId, token, user } = props;
    const [comment, setComment] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComment({...comment, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = JSON.stringify(comment)

        await fetch(`/odinbook/${postId}/create/comment`, {
            method: 'post',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: data
        }).then(res => res.json())
            .then(data => {
                setComment('');
                let copy = [...posts];
                let index = posts.findIndex(post => post._id === postId);
                copy[index] = data.post;
                setPosts(copy);
            })
    }

    return (
        <form>
            <input type='text' placeholder='Write your reply...' value={comment.comment === undefined ? '' : comment.comment} name='comment' onChange={(e) => handleChange(e)} />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Comment</button>
        </form>
    )
}