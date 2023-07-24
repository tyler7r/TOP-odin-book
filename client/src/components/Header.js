import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

    const userInitials = () => {
        let firstName = user.first_name;
        let firstInitial = firstName.slice(0, 1)
        let lastName = user.last_name;
        let lastInitial = lastName.slice(0, 1);
        return `${firstInitial}${lastInitial}`;
    }

    return (
        <div className='header'>
            <Link to='/odinbook' id='logo'>ODINBOOK</Link>
            {user !== null &&
                <>
                    <Link to={`/odinbook${user.url}`}>{userInitials()}</Link>
                    <button onClick={() => logout()}>Logout</button>
                </>
            }
        </div>
    )
}