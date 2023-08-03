import React, { useState } from 'react'
import '../styles/search-bar.css'
import '../images/search-icon.png'

export const SearchBar = (props) => {
    const { setSearchOpen } = props;
    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearch({...search, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (search.topic === undefined || search.topic === '') {
            return
        } else {
            setSearchOpen(false);
            window.location.href = `/odinbook/search/${search.topic}`;
        }
    }

    return (
        <form id='main-search-container'>
            <input id='main-search' type='text' placeholder='Search...' value={search.topic === undefined ? '' : search.topic} name='topic' onChange={(e) => handleChange(e)} />
            <img src={require('../images/search-icon.png')} onClick={(e) => handleSubmit(e)} id='search-icon' alt='search' />
        </form>
    )
}