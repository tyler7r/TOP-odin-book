import React from 'react';
import { useParams } from 'react-router-dom';

export const ProfileInfo = (props) => {
    const { setEditProfileModal, token, setProfileData, profileData, formData, setFormData } = props;
    const { userId } = useParams();

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
        setEditProfileModal(false);
        let data = JSON.stringify(formData);
        await fetch(`/odinbook/users/${userId}/edit-profile`, {
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

    return (
        <div>
            <form>
                <label htmlFor='bio'>Bio: </label>
                <input type='text' value={formData.bio === undefined ? '' : formData.bio} onChange={(e) => handleChange(e)} name='bio' />
                <input accept='image/' type='file' onChange={(e) => convertToBase64(e)} name='profilePic' />
                <button type='submit' onClick={(e) => handleSubmit(e)}>Confirm</button>
            </form>
            {formData.profilePic === undefined ? '' : <img src={formData.profilePic} width={100} height={100} alt='profilePic' />}
            <button onClick={() => setEditProfileModal(false)}>Close</button>
        </div>
    )
}
