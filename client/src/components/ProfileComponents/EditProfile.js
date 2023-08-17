import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/edit-profile.css';
import '../../styles/modal.css'
import { EmptyFormWarning } from './EmptyFormWarning';

export const EditProfile = (props) => {
    const { server, setEditProfileModalOpen, token, setProfileData, profileData, formData, setFormData } = props;
    const { userId } = useParams();
    const [previewMode, setPreviewMode] = useState(false);
    const [emptyFormWarning, setEmptyFormWarning] = useState(false);
    const [imageHover, setImageHover] = useState(false);

    const fileInput = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    const convertToBase64 = (e) => {
        const { name } = e.target
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setFormData({...formData, [name]: reader.result})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditProfileModalOpen(false);
        setEmptyFormWarning(false);
        let data = JSON.stringify(formData);
        await fetch(`${server}/odinbook/users/${userId}/edit-profile`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: data
        }).then(res => res.json())
            .then(data => {
                setProfileData({
                    ...profileData,
                    profilePic: data.user.profilePic,
                    profileBio: data.user.profileBio,
                })
            });
    }

    const removeImage = () => {
        const input = document.getElementById('pic-input');
        input.value = '';
        setFormData({...formData, profilePic: ''});
        setPreviewMode(false);
    }

    const previewModeCheck = () => {
        if (previewMode === true || (formData.profilePic !== undefined && formData.profilePic !== '')) {
            return 'preview'
        } else {
            return
        }
    }

    const checkForEmptyProfileBio = () => {
        if (formData.bio === '' || formData.bio === undefined) {
            return true
        }
    }

    const checkForEmptyProfilePic = () => {
        if (formData.profilePic === undefined || formData.profilePic === '') {
            return true
        }
    }

    const isFormEmpty = () => {
        if (checkForEmptyProfileBio() === true || checkForEmptyProfilePic() === true) {
            return true
        }
    }

    const submitProfileBtn = () => {
        if (isFormEmpty() === true) {
            return (
                <div className='submit-modal-btn' onClick={() => setEmptyFormWarning(true)}>Confirm</div>
            )
        } else {
            return (
                <button className='submit-modal-btn' type='submit' onClick={(e) => handleSubmit(e)}>Confirm</button>
            )
        }
    }

    return (
        <div className='overlay'>
            <div id="edit-profile-container">
                <div className="modal-header">
                    <h2 className='modal-title'>Edit Profile</h2>
                    <button className='close-modal-btn' onClick={() => setEditProfileModalOpen(false)}>X</button>
                </div>
                <form id='edit-profile-form' className={previewModeCheck()}>
                    {(previewModeCheck() === 'preview') &&
                        <div className='image-preview-container' onMouseEnter={() => setImageHover(true)} onMouseLeave={() => setImageHover(false)}>
                            <img src={formData.profilePic} alt='imagePreview' className='image-preview' />
                            {imageHover === true &&
                                <div onClick={() => removeImage()} className='image-preview-hover'>
                                    <img src={require('../../images/trash.png')} alt='trash-preview' className='trash-image-preview' />
                                </div>
                            }
                        </div>
                    }
                    <div className={`edit-bio-container ${previewModeCheck()}`}>
                        <label className='bio-label' htmlFor='bio'>Bio (60 characters max)</label>
                        <textarea className='bio-text' value={formData.bio === undefined ? '' : formData.bio} onChange={(e) => handleChange(e)} name='bio' maxLength={60} />
                    </div>
                    <div className={`file-upload ${previewModeCheck()}`}>
                        {(previewModeCheck() === 'preview') && <div className='preview-image-msg'>Image Preview</div>}
                        <img onClick={() => fileInput.current.click()} src={require('../../images/upload.png')} alt='file-upload' className='file-upload-image' />
                        <input accept='image/' type='file' onChange={(e) => convertToBase64(e)} name='profilePic' ref={fileInput} id='pic-input' />
                    </div>
                    {submitProfileBtn()}
                    {emptyFormWarning && 
                        <EmptyFormWarning setEmptyFormWarning={setEmptyFormWarning} handleSubmit={handleSubmit} checkForEmptyProfilePic={checkForEmptyProfilePic} checkForEmptyProfileBio={checkForEmptyProfileBio} />
                    }
                </form>
            </div>
        </div>
    )
}
