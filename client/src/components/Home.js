import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NewPost } from './NewPost';
import { DisplayPosts } from './DisplayPosts';
import { GuestHome } from './GuestViews/GuestHome';
import { FriendsFeed } from './FeedViews/FriendsFeed';
import { RecentFeed } from './FeedViews/RecentFeed';
import './Home.css'
import { PopularFeed } from './FeedViews/PopularFeed';

export const Home = (props) => {
    const { user, token, isGuest } = props;
    const [posts, setPosts] = useState(null);
    const [view, setView] = useState('recent');
    const [skip, setSkip] = useState(0);
    // const [errors, setErrors] = useState(null);

    return (
        <>
            {token !== null &&
                <>
                    <Link to='/odinbook/users/index'>User Index</Link>
                    <h1>Home Page</h1>
                    {user !== null &&
                        <>
                            <Link to={`/odinbook${user.url}`}>{user.fullName} @{user.username}</Link>
                            <NewPost token={token} user={user} posts={posts} setPosts={setPosts} />
                        </>
                    }
                    {isGuest === false
                        ? <>
                            <button onClick={() => {setView('friends')}}>Friends</button>
                            <button onClick={() => {setView('recent')}}>Recent</button>
                            <button onClick={() => setView('popular')}>Popular</button>
                                {view === 'recent' 
                                    ? <RecentFeed setView={setView} view={view} token={token} user={user} />
                                    : (view === 'friends'
                                        ? <FriendsFeed setView={setView} view={view} token={token} user={user} />
                                        : <PopularFeed setView={setView} view={view} token={token} user={user} />) 
                                }
                        </>
                        : <GuestHome token={token} user={user} posts={posts} setPosts={setPosts}></GuestHome>
                    }
                </>
            }
        </>
    )
}