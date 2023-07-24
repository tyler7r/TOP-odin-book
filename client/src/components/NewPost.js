import React, { useState, useEffect, token, user } from 'react';

export const NewPost = (props) => {
    const { token, posts, setPosts } = props;
    const [postData, setPostData] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target
        setPostData({...postData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = JSON.stringify(postData);
        
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
                setPostData('');
                setPosts([data.post, ...posts])
            })
    }

    const convertToBase64 = (e) => {
        const { name } = e.target
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setPostData({...postData, [name]: reader.result})
        }
    }

    return (
        <form>
            <input type='text' name='postText' value={postData.postText === undefined ? '' : postData.postText} onChange={(e) => handleChange(e)} placeholder={`What's on your mind, ${props.user.first_name}?`} />
            <input accept='image/' type='file' onChange={(e) => convertToBase64(e)} name='image' />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Post</button>
        </form>
    )
}