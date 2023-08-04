import React, { useState } from 'react';

export const SearchIndexes = (props) => {
    const { mode, setMode, setSearch, view } = props;
    const [topic, setTopic] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTopic({...topic, [name]: value})
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setMode('search');
        setSearch(topic.topic);
    }

    const clearSearch = async (e) => {
        e.preventDefault()
        setMode('all');
        setTopic('');
        setSearch('');
    }

    return (
        <>
            <form className='search-container'>
                <input type='text' className='search-text' placeholder={`Search ${view}...`} value={topic.topic === undefined ? '' : topic.topic} name='topic' onChange={(e) => handleChange(e)} />
                {mode === 'search' &&
                    <button className='clear-search-btn' onClick={(e) => clearSearch(e)}>X</button>
                }
                <img src={require('../../images/search-icon.png')} onClick={(e) => handleSearch(e)} className='search-icon' alt='search' />
            </form>
        </>
    )
}