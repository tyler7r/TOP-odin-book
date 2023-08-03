import React, { useState, useEffect, useRef } from 'react';
import '../../styles/new-post.css'
import '../../styles/modal.css'

export const NewPost = (props) => {
    const { token, posts, setPosts, setNewPostOpen, setSkip } = props;
    const [postData, setPostData] = useState('');
    const [previewMode, setPreviewMode] = useState(false)
    const [imageHover, setImageHover] = useState(false)

    const fileInput = useRef(null);

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
                setNewPostOpen(false);
                setPostData('');
                setPosts([data.post, ...posts])
                let picUpload = document.querySelector('#pic-input');
                picUpload.value = '';
                setSkip(0);
            })
    }

    const convertToBase64 = (e) => {
        const { name } = e.target
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setPostData({...postData, [name]: reader.result})
            setPreviewMode(true)
        }
    }

    const removeImage = () => {
        const input = document.getElementById('pic-input');
        input.value = '';
        setPostData({...postData, image: undefined})
        setPreviewMode(false);
    }

    const invalidPostCheck = () => {
        if (postData.image === undefined && (postData.postText === undefined || postData.postText === '')) {
            return true
        }
    }

    const submitPostValidityCheck = () => {
        if (invalidPostCheck() === true) {
            return <div type='submit' className='submit-modal-btn invalid'>Post</div>
        } else {
            return <button type='submit' className='submit-modal-btn valid' onClick={(e) => handleSubmit(e)}>Post</button>
        }
    }

    const previewModeCheck = () => {
        if (previewMode === true) {
            return 'preview'
        }
    }

    return (
        <div className='overlay'>
            <div id='new-post-container'>
                <div className='modal-header'>
                    <h2 className='modal-title'>New Post</h2>
                    <button className='close-modal-btn' onClick={() => setNewPostOpen(false)}>X</button>
                </div>
                <form id='new-post-form' className={previewModeCheck()}>
                    {previewMode &&
                        <div className='image-preview-container' onMouseEnter={() => setImageHover(true)} onMouseLeave={() => setImageHover(false)}>
                            <img src={postData.image} alt='imagePreview' className='image-preview' />
                            {imageHover === true &&
                                <div onClick={() => removeImage()} className='image-preview-hover'>
                                    <img src={require('../../images/trash.png')} alt='trash-preview' className='trash-image-preview' />
                                </div>
                            }
                        </div>
                    }
                    <textarea className={previewModeCheck()} id='new-post-text' name='postText' value={postData.postText === undefined ? '' : postData.postText} onChange={(e) => handleChange(e)} placeholder={`What's on your mind, ${props.user.first_name}?`} maxLength={250} />
                    <div className={`file-upload ${previewModeCheck()}`}>
                        {previewMode && <div className='preview-image-msg'>Image Preview</div>}
                        <img onClick={() => fileInput.current.click()} src={require('../../images/upload.png')} alt='file-upload' className='file-upload-image' />
                        <input accept='image/' type='file' onChange={(e) => convertToBase64(e)} name='image' ref={fileInput} id='pic-input' />
                    </div>
                    {submitPostValidityCheck()}
                </form>
            </div>
        </div>
    )
}