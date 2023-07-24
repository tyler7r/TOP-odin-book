import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const GuestHeader = (props) => {
    const { user } = props;

    return (
        <div className='header'>
            <Link to='/odinbook' id='logo'>ODINBOOK</Link>
            <Link to='/odinbook/login'>Log In</Link>
            <Link to='/odinbook/signup'>Sign Up</Link>
        </div>
    )
}