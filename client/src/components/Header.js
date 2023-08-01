import React from 'react';
import { Link } from 'react-router-dom';
import { userInitials } from '../HelperFunctions/UserInitials';
import '../styles/header.css'

export const Header = (props) => {
    const { user, searchOpen, setSearchOpen, searchBtn } = props;

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

    const checkBtnFunctionality = () => {
        if (searchBtn === true) {
            return <div id='open-search' onClick={() => setSearchOpen(!searchOpen)}>Search</div>
        } else {
            return
        }
    }

    return (
        <div className='header'>
            <Link to='/odinbook' id='logo'>
                <div id='logo-the'>The</div>
                <div id='logo-odinbook'>ODINBOOK</div>
            </Link>
            {user !== null &&
                <div id='header-nav'>
                    <div id="header-links">
                        <Link id='user-index' to='/odinbook/users/index'>User Index</Link>
                        {checkBtnFunctionality()}
                    </div>
                    <div id="user-header">
                        <Link id='header-user-link' to={`/odinbook${user.url}`}>{userInitials(user)}</Link>
                        <button id='logout-btn' onClick={() => logout()}>Logout</button>
                    </div>
                </div>
            }
        </div>
    )
}