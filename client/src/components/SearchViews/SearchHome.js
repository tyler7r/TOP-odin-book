import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { PostResults } from './PostResults';
import { UserResults } from './UserResults';
import { Header } from '../Header';

export const SearchHome = (props) => {
    const search = useParams();
    const { server, token, user } = props;
    const [view, setView] = useState('posts');

    const checkView = (buttonView) => {
        if (view === buttonView) {
            return 'view-select selected'
        } else {
            return 'view-select'
        }
    }

    return (
        <>
            {token !== null &&
                <div>
                    <Header server={server} user={user} />
                    <SearchBar token={token} />
                    <div className='search-results-container'>
                        <h2 className='search-results-msg'>Search Results for</h2>
                        <h2 className='search-results-keyword'>{search.topic}</h2>
                    </div>
                    <div className="view-select-menu">
                        <button className={checkView('posts')} onClick={() => setView('posts')}>Posts</button>
                        <button className={checkView('users')} onClick={() => setView('users')}>Users</button>
                    </div>
                    {view === 'posts'
                        ? <PostResults server={server} token={token} user={user} view={view} />
                        : <UserResults server={server} token={token} user={user} view={view} />
                    }
                </div>
            }
        </>
    )
}