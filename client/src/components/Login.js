import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/login.css';

export const Login = (props) => {
    const { server } = props;
    const [formData, setFormData] = useState('');
    const [errors, setErrors] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = JSON.stringify(formData);
        await fetch(`${server}/odinbook/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        }).then(res => res.json())
            .then(data => {
                if (data.errors) {
                    setErrors(data.errors.message);
                    return
                } else {
                    localStorage.setItem('user', JSON.stringify(data.user))
                    localStorage.setItem('token', JSON.stringify(data.token))
                    window.location.href = '/odinbook'
                }
            })
    }

    const handleGuest = async() => {
        window.location.href = process.env.REACT_APP_GUEST_URL;
    }

    return (
        <div id='login-container'>
            <div id='title'>
                <div id='the'>The</div>
                <h1 id='odinbook'>ODINBOOK</h1>
            </div>
            <div id='login-msg'>Log in to your account</div>
            <form id='login-form'>
                <div className="form-group">
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' value={formData.username === undefined ? '' : formData.username} onChange={(e) => handleChange(e)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input type='text' name='password' value={formData.password === undefined ? '' : formData.password} onChange={(e) => handleChange(e)} required/>
                </div>
                {errors !== '' &&
                    <div id='error-msg'>{errors}</div>
                }
                <button id='submit' type='submit' onClick={(e) => handleSubmit(e)}>Log In</button>
            </form>
            <div id='signup-message'>Don't have an account?</div>
            <div id='no-account-options'>
                <Link id='signup' to='/odinbook/signup'>Sign Up</Link>
                <div id='or'>OR</div>
                <div id='guest-button' onClick={() => handleGuest()}>Continue as Guest</div>
            </div>
        </div>
    )
}