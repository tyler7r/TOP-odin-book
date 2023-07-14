import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NewPost } from './NewPost';
import { DisplayPosts } from './DisplayPosts';
import { GuestHome } from './GuestViews/GuestHome';
import { FriendsFeed } from './FeedViews/FriendsFeed';
import { RecentFeed } from './FeedViews/RecentFeed';
import './Home.css'
import { PopularFeed } from './FeedViews/PopularFeed';
import { SearchBar } from './SearchBar';
import { Header } from './Header';

export const Home = (props) => {
    const { user, token, isGuest } = props;
    const [posts, setPosts] = useState(null);
    const [view, setView] = useState('recent');
    // const [errors, setErrors] = useState(null);

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
                    {user !== null &&
                        <NewPost token={token} user={user} posts={posts} setPosts={setPosts} />
                    }
                    {isGuest === false
                        ? <>
                            <button onClick={() => {setView('friends')}}>Friends</button>
                            <button onClick={() => {setView('recent')}}>Recent</button>
                            <button onClick={() => setView('popular')}>Popular</button>
                            {viewSelector(view)}
                        </>
                        : <GuestHome token={token} user={user} posts={posts} setPosts={setPosts}></GuestHome>
                    }
                </>
            }
        </>
    )
}