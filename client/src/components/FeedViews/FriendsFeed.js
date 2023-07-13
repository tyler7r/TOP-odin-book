import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NewPost } from '../NewPost';
import { DisplayPosts } from '../DisplayPosts';
import '../Home.css';

export const FriendsFeed = (props) => {
    const { user, token, view, setView } = props;
    const [posts, setPosts] = useState(null);
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
                        let friendPosts = data.posts.filter(post => data.friends.includes(post.author._id))
                        setPosts([...posts, ...friendPosts])
                    } else {
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
            fetchPosts();
        }
    }, [token, skip]);

    useEffect(() => {
        setSkip(0)
    }, [])

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(posts.length)
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
                    <button onClick={() => setView('friends')}>Friends</button>
                    <button onClick={() => setView('recent')}>Recent</button>
                    <button onClick={() => setView('popular')}>Popular</button>
                    <div className='feed' onScroll={handleScroll}>
                        <h4>Friends Feed</h4>
                        {(posts !== null && posts.length !== 0)
                            ? <DisplayPosts token={token} user={user} posts={posts} setPosts={setPosts} />
                            : <div>No Friend Posts</div>
                        }
                    </div>
                </>
            }
        </>
    )
}