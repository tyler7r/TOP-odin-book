import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css'

export const Header = (props) => {
    const { } = props;

    return (
        <div className='header'>
            <Link to='/odinbook/g/home' id='logo'>ODINBOOK</Link>
            <Link to='http://localhost:3000/odinbook/login'>Log In</Link>
            <Link to='http://localhost:3000/odinbook/signup'>Sign Up</Link>
        </div>
    )
}