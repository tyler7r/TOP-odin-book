import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NewPost } from './NewPost';
import { DisplayPosts } from './DisplayPosts';
import { GuestHome } from './GuestViews/GuestHome';
import './Home.css'

export const Home = (props) => {
    const { user, token, isGuest } = props;
    const [posts, setPosts] = useState(null);
    const [view, setView] = useState('recent');
    const [skip, setSkip] = useState(0);
    // const [errors, setErrors] = useState(null);
    
    const fetchHome = async () => {
        try {
            await fetch(`/odinbook?skip=${skip}`, {
                method: 'get',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                    if (posts !== null) {
                        if (view === 'recent') setPosts([...posts, ...data.posts])
                        else {
                            let friendPosts = data.posts.filter(post => data.friends.includes(post.author._id))
                            setPosts([...posts, ...friendPosts]);
                        }
                    } else {
                        if (view === 'recent') setPosts(data.posts)
                        else {
                            let friendPosts = data.posts.filter(post => data.friends.includes(post.author._id))
                            setPosts(friendPosts);
                        }
                    }
                })
        } catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        if (token !== null) {
            fetchHome();
        }
    }, [token, view, skip]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(posts.length)
        }
    }

    return (
        <>
            {token !== null &&
                (isGuest === false
                    ? <div className='feed' onScroll={handleScroll}>
                        <Link to='/odinbook/users/index'>User Index</Link>
                        <h1>Home Page</h1>
                        {user !== null &&
                            <>
                                <Link to={`/odinbook${user.url}`}>{user.fullName} @{user.username}</Link>
                                <NewPost token={token} user={user} posts={posts} setPosts={setPosts} />
                            </>
                        }
                        <button onClick={() => setView('friends')}>Friends</button>
                        <button onClick={() => setView('recent')}>Recent</button>
                        {posts !== null &&
                            <DisplayPosts token={token} user={user} posts={posts} setPosts={setPosts}></DisplayPosts>
                        }
                    </div>
                    : <GuestHome token={token} user={user} posts={posts} setPosts={setPosts}></GuestHome>
                )
            }
        </>
    )
}