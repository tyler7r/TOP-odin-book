import React, { useState } from 'react'

export const SearchBar = (props) => {
    const { setSearchOpen } = props;
    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearch({...search, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearchOpen(false)
        window.location.href = `/odinbook/search/${search.topic}`;
    }

    return (
        <form>
            <input type='text' placeholder='Search...' value={search.topic === undefined ? '' : search.topic} name='topic' onChange={(e) => handleChange(e)} />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </form>
    )
}