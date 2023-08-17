import React from 'react';
import { Link } from 'react-router-dom';
import { userInitials } from '../HelperFunctions/UserInitials';
import '../styles/header.css'

export const Header = (props) => {
    const { server, user, searchOpen, setSearchOpen, searchBtnVisible, newPostOpen, setNewPostOpen, newPostVisible, editProfileBtnVisible, setEditProfileModalOpen, editProfileModalOpen, requestModalOpen, setRequestModalOpen, requestBtnVisible, requestAmount } = props;

    const logout = async() => {
        await fetch(`${server}/odinbook/logout`, {
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

    const checkBtnFunctionality = (status, btn) => {
        if (status === true) {
            if (btn === 'search') {
                return <div id='open-search' className='open-modal-btn' onClick={() => setSearchOpen(!searchOpen)}>Search</div>
            } else if (btn === 'new-post') {
                return <div id='open-new-post' className='open-modal-btn' onClick={() => setNewPostOpen(!newPostOpen)}>New Post</div>
            } else if (btn === 'edit-profile') {
                return <div id='open-edit-profile' className='open-modal-btn' onClick={() => setEditProfileModalOpen(!editProfileModalOpen)}>Edit Profile</div>
            } else if (btn === 'request') {
                return (
                    <div id='open-requests' className='open-modal-btn' onClick={() => setRequestModalOpen(!requestModalOpen)}>
                        <div id='open-requests-title'>Friend Requests</div>
                        <div id='request-amount'>{requestAmount}</div>
                    </div>
                )
            }
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
                        {checkBtnFunctionality(newPostVisible, 'new-post')}
                        <Link id='user-index' className='open-modal-btn' to='/odinbook/users/index'>User Index</Link>
                        {checkBtnFunctionality(searchBtnVisible, 'search')}
                        {checkBtnFunctionality(requestBtnVisible, 'request')}
                        {checkBtnFunctionality(editProfileBtnVisible, 'edit-profile')}
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