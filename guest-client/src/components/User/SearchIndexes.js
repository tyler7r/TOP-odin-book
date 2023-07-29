import React, { useState } from 'react';

export const SearchIndexes = (props) => {
    const { mode, setMode, setSearch } = props;
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
        <div>
            <form>
                <input type='text' placeholder='Search term...' value={topic.topic === undefined ? '' : topic.topic} name='topic' onChange={(e) => handleChange(e)} />
                <button type='submit' onClick={(e) => handleSearch(e)}>Search</button>
            </form>
            {mode === 'search' &&
                <button onClick={(e) => clearSearch(e)}>Clear Search</button>
            }
        </div>
    )
}