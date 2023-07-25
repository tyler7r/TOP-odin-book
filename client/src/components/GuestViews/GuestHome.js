import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GuestDisplayPosts } from './GuestDisplayPosts';

export const GuestHome = (props) => {
    const { user, token } = props;
    const [posts, setPosts] = useState(null);
    const [skip, setSkip] = useState(0);
    
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
                        setPosts([...posts, ...data.posts])
                    } else {
                        setPosts(data.posts);
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
    }, [token, skip]);

    return (
        <>
            {token !== null && 
            <>
                {posts !== null &&
                    <GuestDisplayPosts setSkip={setSkip} token={token} user={user} posts={posts} setPosts={setPosts}></GuestDisplayPosts>
                }
            </>
            }
        </>
    )
}