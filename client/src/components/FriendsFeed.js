import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NewPost } from './NewPost';
import { DisplayPosts } from './DisplayPosts';
import { GuestHome } from './GuestViews/GuestHome';
import './Home.css'

export const FriendsFeed = (props) => {
    const { user, token, isGuest, setView, view } = props;
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
                    {user !== null &&
                        <>
                            <Link to={`/odinbook${user.url}`}>{user.fullName} @{user.username}</Link>
                            <NewPost token={token} user={user} posts={posts} setPosts={setPosts} />
                        </>
                    }
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