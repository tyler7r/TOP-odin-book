import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { DisplayPosts } from '../Post/DisplayPosts';

export const PostResults = (props) => {
    const search = useParams();
    const { server, view } = props;
    const [posts, setPosts] = useState(null);
    const [skip, setSkip] = useState(0)

    const fetchPosts = async () => {
        try {
            await fetch(`${server}/odinbook/g/search/${search.topic}?skip=${skip}&view=${view}`, {
                method: 'get',
                headers: {
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
        fetchPosts();
    }, [skip]);

    return (
        <div>
            {(posts !== null && posts.length !== 0) 
                ? <DisplayPosts setSkip={setSkip} posts={posts} />
                : <div className='no-items-msg'>No posts results</div>
            }
        </div>
    )
}