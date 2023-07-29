import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { PostResults } from './PostResults';
import { UserResults } from './UserResults';
import { Header } from '../Header';

export const SearchHome = (props) => {
    const search = useParams();
    const { token, user } = props;
    const [view, setView] = useState('posts');

    return (
        <>
            {token !== null &&
                <div>
                    <Header user={user} />
                    <h1>Search Results for {search.topic}</h1>
                    <SearchBar token={token} />
                    <button onClick={() => setView('posts')}>Posts</button>
                    <button onClick={() => setView('users')}>Users</button>
                    {view === 'posts' 
                        ? <PostResults token={token} user={user} view={view} />
                        : <UserResults token={token} user={user} view={view} />
                    }
                </div>
            }
        </>
    )
}