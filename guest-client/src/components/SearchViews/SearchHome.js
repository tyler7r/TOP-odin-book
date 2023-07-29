import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { PostResults } from './PostResults';
import { UserResults } from './UserResults';
import { Header } from '../Header';

export const SearchHome = (props) => {
    const search = useParams();
    const {  } = props;
    const [view, setView] = useState('posts');

    return (
        <div>
            <Header />
            <h1>Search Results for {search.topic}</h1>
            <SearchBar />
            <button onClick={() => setView('posts')}>Posts</button>
            <button onClick={() => setView('users')}>Users</button>
            {view === 'posts' 
                ? <PostResults view={view} />
                : <UserResults view={view} />
            }
        </div>
    )
}