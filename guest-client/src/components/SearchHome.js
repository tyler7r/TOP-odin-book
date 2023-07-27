import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { PostResults } from './PostResults';
import { UserResults } from './UserResults';
import { Header } from './Header';

export const SearchHome = (props) => {
    const search = useParams();
    const {  } = props;
    const [view, setView] = useState('posts');

    return (
        <>
            <Header />
            <h1>Search Results for {search.topic}</h1>
            <SearchBar />
            <button onClick={() => setView('posts')}>Posts</button>
            <button onClick={() => setView('users')}>Users</button>
            {view === 'posts' 
                ? <PostResults view={view} />
                : <UserResults view={view} />
            }
        </>
    )
}