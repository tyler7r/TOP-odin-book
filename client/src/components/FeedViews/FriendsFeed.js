import React, { useState, useEffect } from 'react'
import { NewPost } from '../PostComponents/NewPost';
import { DisplayPosts } from '../PostComponents/DisplayPosts';
import '../../styles/home.css';

export const FriendsFeed = (props) => {
    const { server, user, token, view, newPostOpen, setNewPostOpen } = props;
    const [posts, setPosts] = useState(null);
    const [skip, setSkip] = useState(0);
    
    const fetchPosts = async () => {
        try {
            await fetch(`${server}/odinbook?skip=${skip}&feed=${view}`, {
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
                    {newPostOpen === true &&
                        <NewPost token={token} user={user} posts={posts} setPosts={setPosts} setNewPostOpen={setNewPostOpen} setSkip={setSkip} />
                    }
                    {(posts !== null && posts.length !== 0)
                        ? <DisplayPosts setSkip={setSkip} token={token} user={user} posts={posts} setPosts={setPosts} />
                        : <div className='no-items-msg'>No Friend Posts Found</div>
                    }
                </div>
            }
        </>
    )
}