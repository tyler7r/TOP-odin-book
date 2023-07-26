import React, { useEffect, useState } from 'react';

export const IndexSearch = (props) => {
    const { token, setUsers, setClearSearch, view, setView } = props;
    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearch({...search, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/odinbook/search/index/${search.topic}`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data.results)
            })
        setSearch('');
        setView('search');
    }

    return (
        <>
            <form>
                <input type='text' placeholder='Search index...' value={search.topic === undefined ? '' : search.topic} name='topic' onChange={(e) => handleChange(e)} />
                <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
            </form>
            {view === 'search' &&
                <button onClick={() => {setView('all'); setClearSearch(true)}}>Clear Search</button>
            }
        </>
    )
}