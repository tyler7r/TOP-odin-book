import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FriendsFeed } from './FeedViews/FriendsFeed';
import { RecentFeed } from './FeedViews/RecentFeed';
import './Home.css'
import { PopularFeed } from './FeedViews/PopularFeed';
import { SearchBar } from './SearchBar';
import { Header } from './Header';

export const Home = (props) => {
    const { user, token } = props;
    const [view, setView] = useState('friends');

    const viewSelector = (view) => {
        if (view === 'recent') {
            return <RecentFeed setView={setView} view={view} token={token} user={user} />
        } else if (view === 'friends') {
            return <FriendsFeed setView={setView} view={view} token={token} user={user} />
        } else if (view === 'popular') {
            return <PopularFeed setView={setView} view={view} token={token} user={user} />
        }
    }

    return (
        <>
            {token !== null &&
                <>
                    <Header user={user} />
                    <Link to='/odinbook/users/index'>User Index</Link>
                    <SearchBar token={token} user={user} />
                    <h1>Home Page</h1>
                    <button onClick={() => setView('friends')}>Friends</button>
                    <button onClick={() => setView('recent')}>Recent</button>
                    <button onClick={() => setView('popular')}>Popular</button>
                    {viewSelector(view)}
                </>
            }
        </>
    )
}