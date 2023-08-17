import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css'

export const Header = (props) => {
    const { setSearchOpen, searchOpen, searchBtnVisible } = props;

    const checkBtnFunctionality = (status, btn) => {
        if (status === true) {
            if (btn === 'search') {
                return <div id='open-search' className='open-modal-btn' onClick={() => setSearchOpen(!searchOpen)}>Search</div>
            }
        }
    }

    return (
        <div className='header'>
            <Link to='/odinbook/g/home' id='logo'>
                <div id='logo-the'>The</div>
                <div id="logo-odinbook">ODINBOOK</div>
            </Link>
            <div id="header-links">
                <Link id='user-index' className='open-modal-btn' to='/odinbook/g/users/index'>User Index</Link>
                {checkBtnFunctionality(searchBtnVisible, 'search')}
                <Link className='open-modal-btn' id='login-btn' to='https://top-odinbook.netlify.app/odinbook/login'>Log In</Link>
                <Link className='open-modal-btn' id='signup-btn' to='https://top-odinbook.netlify.app/odinbook/signup'>Sign Up</Link>
            </div>
        </div>
    )
}