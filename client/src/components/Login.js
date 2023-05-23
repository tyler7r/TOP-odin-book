import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
    const [formData, setFormData] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
        console.log(formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data = JSON.stringify(formData);
            let res = await fetch(`/odinbook/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            })
            let myJson = await res.json();
            localStorage.setItem('user', JSON.stringify(myJson.user))
            localStorage.setItem('token', JSON.stringify(myJson.token))
            window.location.href = '/odinbook'
        } catch (err) {
            console.error(err);
        }
    }

    const handleGuest = async (e) => {
        e.preventDefault();
        try {
            let guestInfo = {
                username: 'guest',
                password: 'guest',
            }
            let data = JSON.stringify(guestInfo);
            let res = await fetch('/odinbook/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data
            })
            let myJson = await res.json();
            localStorage.setItem('user', JSON.stringify(myJson.user));
            localStorage.setItem('token', JSON.stringify(myJson.token));
            window.location.href = '/odinbook';
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1>Welcome to the OdinBook</h1>
            <form>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' value={formData.username === undefined ? '' : formData.username} onChange={(e) => handleChange(e)} required/>
                <label htmlFor='password'>Password: </label>
                <input type='text' name='password' value={formData.password === undefined ? '' : formData.password} onChange={(e) => handleChange(e)} required/>
                <button type='submit' onClick={(e) => handleSubmit(e)}>Log In</button>
            </form>
            <Link to='/odinbook/signup'>Sign Up</Link>
            <div onClick={(e) => handleGuest(e)}>Continue as Guest</div>
        </>
    )
}