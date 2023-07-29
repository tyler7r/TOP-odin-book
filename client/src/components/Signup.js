import React, { useState } from 'react'

export const Signup = () => {
    const [formData, setFormData] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data = JSON.stringify(formData);
            await fetch('/odinbook/signup', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: data,
            })
            window.location.href = '/odinbook/login';
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <form>
                <label htmlFor='first_name'>First Name: </label>
                <input type='text' value={formData.first_name === undefined ? '' : formData.first_name} name='first_name' onChange={(e) => handleChange(e)} required/>
                <label htmlFor='last_name'>Last Name: </label>
                <input type='text' value={formData.last_name === undefined ? '' : formData.last_name} name='last_name' onChange={(e) => handleChange(e)} required/>
                <label htmlFor='username'>Username: </label>
                <input type='text' value={formData.username === undefined ? '' : formData.username} name='username' onChange={(e) => handleChange(e)} required/>
                <label htmlFor='password'>Password: </label>
                <input type='text' value={formData.password === undefined ? '' : formData.password} name='password' onChange={(e) => handleChange(e)} required/>
                <label htmlFor='confirm_password'>Confirm Password: </label>
                <input type='text' value={formData.confirm_password === undefined ? '' : formData.confirm_password} name='confirm_password' onChange={(e) => handleChange(e)} />
                <button type='submit' onClick={(e) => handleSubmit(e)}>Sign Up</button>
            </form>
        </>
    )
}