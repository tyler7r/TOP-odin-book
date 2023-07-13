import React, { useState, useEffect, token, user } from 'react';

export const NewPost = (props) => {
    const { token, posts, setPosts } = props;
    const [postText, setPostText] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target
        setPostText({...postText, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = JSON.stringify(postText);
        
        await fetch(`/odinbook/create/post`, {
            method: 'post',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(res => res.json())
            .then(data => {
                setPostText('');
                setPosts([data.post, ...posts])
            })
    }

    return (
        <form>
            <input type='text' name='postText' value={postText.postText === undefined ? '' : postText.postText} onChange={(e) => handleChange(e)} placeholder={`What's on your mind, ${props.user.first_name}?`} />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Post</button>
        </form>
    )
}