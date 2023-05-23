import React, { useState, useEffect } from 'react';

export const NewPost = (props) => {
    const [postText, setPostText] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target
        setPostText({...postText, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('token'));
        const bearer = `Bearer ${token}`;
        const data = JSON.stringify(postText);
        
        await fetch(`/odinbook/create/post`, {
            method: 'post',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(res => res.json()).then(data => console.log(data))
        window.location.href = '/odinbook';
    }

    return (
        <form>
            <input type='text' name='postText' value={postText.postText} onChange={(e) => handleChange(e)} placeholder={`What's on your mind, ${props.user.first_name}?`} />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Post</button>
        </form>
    )
}