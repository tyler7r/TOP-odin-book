import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NewPost } from './NewPost';
import { DisplayPosts } from './DisplayPosts';

export const Home = (props) => {
    const { user, token } = props;
    const [posts, setPosts] = useState(null);
    const [view, setView] = useState('friends');
    // const [errors, setErrors] = useState(null);
    
    const fetchHome = async () => {
        try {
            await fetch('/odinbook', {
                method: 'get',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                    if (view === 'recent') setPosts(data.posts)
                    else {
                        let friendPosts = data.posts.filter(post => data.friends.includes(post.author._id))
                        setPosts(friendPosts);
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
    }, [token, view]);

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
                <button onClick={() => setView('friends')}>Friends</button>
                <button onClick={() => setView('recent')}>Recent</button>
                {posts !== null &&
                    (view === 'friends'
                        ? <DisplayPosts  token={token} user={user} posts={posts} setPosts={setPosts}></DisplayPosts>
                        : <DisplayPosts  token={token} user={user} posts={posts} setPosts={setPosts}></DisplayPosts>
                    )
                }
            </>
            }
        </>
    )
}