import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NewPost } from './NewPost';
import { DisplayPosts } from './DisplayPosts';

export const Home = (props) => {
    const { user, token } = props;
    const [posts, setPosts] = useState(null);
    // const [errors, setErrors] = useState(null);
    
    const fetchHome = async () => {
        let res = await fetch('/odinbook', {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        let myJson = await res.json();
        setPosts(myJson.posts);
    }

    useEffect(() => {
        if (token !== null) {
            fetchHome()
        }
    }, [token]);

    return (
        <>
            {token !== null && 
            <>
                <h1>Home Page</h1>
                {user !== null &&
                    <>
                        <Link to={`/odinbook${user.url}`}>{user.fullName} @{user.username}</Link>
                        <NewPost token={token} user={user} posts={posts} setPosts={setPosts} />
                    </>
                } {posts !== null && 
                    <DisplayPosts token={token} user={user} posts={posts} setPosts={setPosts} />
                }
            </>
            }
        </>
    )
}