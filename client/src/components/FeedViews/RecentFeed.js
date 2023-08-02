import React, { useState, useEffect } from 'react'
import { NewPost } from '../PostComponents/NewPost';
import { DisplayPosts } from '../PostComponents/DisplayPosts';
import '../../styles/home.css'

export const RecentFeed = (props) => {
    const { user, token, view, newPostOpen, setNewPostOpen } = props;
    const [posts, setPosts] = useState(null);
    const [skip, setSkip] = useState(0);

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
                    if (skip !== 0) {
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
    }, [token, skip, newPostOpen]);

    return (
        <>
            {token !== null &&
                <div className='home-page'>
                    {newPostOpen && 
                        <NewPost token={token} user={user} posts={posts} setPosts={setPosts} setNewPostOpen={setNewPostOpen} setSkip={setSkip} />
                    }
                    <h4>Recent Feed</h4>
                    {(posts !== null && posts.length !== 0)
                        ? <DisplayPosts setSkip={setSkip} token={token} user={user} posts={posts} setPosts={setPosts} />
                        : <div>No recent posts</div>
                    }
                </div>
            }
        </>
    )
}