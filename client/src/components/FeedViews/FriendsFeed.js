import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NewPost } from '../NewPost';
import { DisplayPosts } from '../DisplayPosts';
import '../Home.css';

export const FriendsFeed = (props) => {
    const { user, token, view } = props;
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
                        setPosts([...posts, ...data.posts])
                    } else {
                        setPosts(data.posts)
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
                <div className='feed' onScroll={handleScroll}>
                    <NewPost token={token} user={user} posts={posts} setPosts={setPosts} />
                    <h4>Friends Feed</h4>
                    {(posts !== null && posts.length !== 0)
                        ? <DisplayPosts token={token} user={user} posts={posts} setPosts={setPosts} />
                        : <div>No Friend Posts</div>
                    }
                </div>
            }
        </>
    )
}