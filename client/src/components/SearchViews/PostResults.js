import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { DisplayPosts } from '../DisplayPosts';

export const PostResults = (props) => {
    const search = useParams();
    const { token, user, view } = props;
    const [posts, setPosts] = useState(null);
    const [skip, setSkip] = useState(0)

    const fetchPosts = async () => {
        try {
            await fetch(`/odinbook/search/${search.topic}?skip=${skip}&view=${view}`, {
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
                    {(posts !== null && posts.length !== 0) 
                        ? <DisplayPosts token={token} posts={posts} setPosts={setPosts} user={user} />
                        : <div>No posts results</div>
                    }
                </div>
            }
        </>
    )
}