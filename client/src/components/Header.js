import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userInitials } from './HelperFunctions/UserInitials';
import './header.css'

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
            {user !== null &&
                <>
                    <Link to={`/odinbook${user.url}`}>{userInitials(user)}</Link>
                    <button onClick={() => logout()}>Logout</button>
                </>
            }
        </div>
    )
}