import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/signup.css'

export const Signup = () => {
    const [formData, setFormData] = useState('');
    const [errors, setErrors] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = JSON.stringify(formData);
        await fetch('/odinbook/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: data,
        }).then(res => res.json())
            .then(data => {
                if (data.errors) {
                    if (typeof data.errors === 'string') {
                        setErrors(data.errors)
                    } else {
                        setErrors(data.errors[0].msg)
                    }
                } else {
                    window.location.href = '/odinbook/login'
                }
            })
    }

    return (
        <div id='signup-container'>
            <div id='title'>
                <div id='the'>The</div>
                <h1 id='odinbook'>ODINBOOK</h1>
            </div>
            <div id='signup-msg'>Sign up for an account</div>
            <form id='signup-form'>
                <div className="form-group">
                    <label htmlFor='first_name'>First Name</label>
                    <input type='text' value={formData.first_name === undefined ? '' : formData.first_name} name='first_name' onChange={(e) => handleChange(e)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor='last_name'>Last Name</label>
                    <input type='text' value={formData.last_name === undefined ? '' : formData.last_name} name='last_name' onChange={(e) => handleChange(e)} required/>
                </div>
                <div className="form-group" id='username-signup'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' value={formData.username === undefined ? '' : formData.username} name='username' onChange={(e) => handleChange(e)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input type='text' value={formData.password === undefined ? '' : formData.password} name='password' onChange={(e) => handleChange(e)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <input type='text' value={formData.confirm_password === undefined ? '' : formData.confirm_password} name='confirm_password' onChange={(e) => handleChange(e)} />
                </div>
                {errors !== null &&
                    <div id='error-msg'>{errors}</div>
                }
                <button id='submit' type='submit' onClick={(e) => handleSubmit(e)}>Sign Up</button>
            </form>
            <Link to='/odinbook/login' id='back-to-login'>Back to login</Link>
        </div>
    )
}