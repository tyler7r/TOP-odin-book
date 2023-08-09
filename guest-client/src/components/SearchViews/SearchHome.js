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

    const checkView = (btn) => {
        if (view === btn) {
            return 'view-select selected'
        } else {
            return 'view-select'
        }
    }

    return (
        <div>
            <Header />
            <SearchBar />
            <div className='search-results-container'>
                <div className='search-results-msg'>Search Results for</div>
                <div className='search-results-keyword'>{search.topic}</div>
            </div>
            <div className="view-select-menu">
                <button className={checkView('posts')} onClick={() => setView('posts')}>Posts</button>
                <button className={checkView('users')} onClick={() => setView('users')}>Users</button>
            </div>
            {view === 'posts'
                ? <PostResults view={view} />
                : <UserResults view={view} />
            }
        </div>
    )
}