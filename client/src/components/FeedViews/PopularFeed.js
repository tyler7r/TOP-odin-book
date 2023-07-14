import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NewPost } from '../NewPost';
import { DisplayPosts } from '../DisplayPosts';
import '../Home.css'

export const PopularFeed = (props) => {
    const { user, token, fetchPosts } = props;
    const [posts, setPosts] = useState(null);
    const [skip, setSkip] = useState(0);
    // const [errors, setErrors] = useState(null);

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
            {console.log(posts)}
            {token !== null &&
                <>
                    <div className='feed' onScroll={handleScroll}>
                        <h4>Popular Feed</h4>
                        {(posts !== null && posts.length !== 0)
                            ? <DisplayPosts token={token} user={user} posts={posts} setPosts={setPosts} />
                            : <div>No recent posts</div>
                        }
                    </div>
                </>
            }
        </>
    )
}