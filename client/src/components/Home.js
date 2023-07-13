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

    const fetchPosts = async () => {
        try {
            await fetch(`/odinbook?skip=${skip}&feed=${view}`, {
                method: 'get',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                    if (posts !== null) {
                        setPosts([...posts, ...data.posts]);
                    } else {
                        setPosts(data.posts);
                    }
                })
        } catch (err){
            console.log(err)
        }
    }

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
                            <button onClick={() => setView('friends')}>Friends</button>
                            <button onClick={() => setView('recent')}>Recent</button>
                            <button onClick={() => setView('popular')}>Popular</button>
                            {view === 'recent'
                                ? <RecentFeed fetchPosts={fetchPosts} token={token} user={user} posts={posts} setPosts={setPosts} />
                                : (view === 'friends'
                                    ? <FriendsFeed fetchPosts={fetchPosts} token={token} user={user} posts={posts} setPosts={setPosts} />
                                    : <PopularFeed fetchPosts={fetchPosts} token={token} user={user} posts={posts} setPosts={setPosts} />) 
                            }
                        </>
                        : <GuestHome token={token} user={user} posts={posts} setPosts={setPosts}></GuestHome>
                    }
                </>
            }
        </>
    )
}