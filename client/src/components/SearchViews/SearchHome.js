import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { PostResults } from './PostResults';
import { UserResults } from './UserResults';
import { Header } from '../Header';
import { GuestHeader } from '../GuestViews/GuestHeader';

export const SearchHome = (props) => {
    const search = useParams();
    const { token, user, isGuest } = props;
    const [view, setView] = useState('posts');

    return (
        <>
            {token !== null &&
                <>
                    {isGuest === false 
                        ? <Header user={user} />
                        : <GuestHeader user={user} />
                    }
                    <h1>Search Results for {search.topic}</h1>
                    <SearchBar token={token} />
                    <button onClick={() => setView('posts')}>Posts</button>
                    <button onClick={() => setView('users')}>Users</button>
                    {view === 'posts' 
                        ? <PostResults token={token} user={user} view={view} />
                        : <UserResults token={token} user={user} view={view} isGuest={isGuest} />
                    }
                </>
            }
        </>
    )
}