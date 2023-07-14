import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = (props) => {
    const { user } = props;

    const logout = async() => {
        await fetch('/odinbook/logout', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.user);
            })
        window.location.href = '/odinbook/login';
    }

    return (
        <div className='header'>
            <Link to='/odinbook' id='logo'>ODINBOOK</Link>
            <button onClick={() => logout()}>Logout</button>
            {user !== null &&
                <Link to={`/odinbook${user.url}`}>{user.fullName} @{user.username}</Link>
            }
        </div>
    )
}