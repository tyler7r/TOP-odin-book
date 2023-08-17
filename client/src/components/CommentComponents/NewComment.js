import React, { useState } from 'react';
import '../../styles/new-comment.css'

export const NewComment = (props) => {
    const { server, setPosts, posts, postId, token } = props;
    const [comment, setComment] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComment({...comment, [name]: value})
    }

    const checkValidComment = () => {
        const cmt = comment.comment
        if (cmt !== '' && cmt !== undefined) {
            return <button type='submit' className='submit-comment valid' onClick={(e) => handleSubmit(e)}>Comment</button>
        } else {
            return <div type='submit' className='submit-comment invalid'>Comment</div>
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = JSON.stringify(comment)

        await fetch(`${server}/odinbook/${postId}/create/comment`, {
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
        <form className='new-comment'>
            <textarea className='new-comment-text' placeholder='Write your reply...' value={comment.comment === undefined ? '' : comment.comment} name='comment' onChange={(e) => handleChange(e)} maxLength={160} />
            {checkValidComment()}
        </form>
    )
}