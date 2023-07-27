import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DisplayPosts } from './DisplayPosts';

export const Home = (props) => {
    const { } = props;
    const [posts, setPosts] = useState(null);
    const [skip, setSkip] = useState(0);
    
    const fetchHome = async () => {
        try {
            await fetch(`/odinbook/g?skip=${skip}`, {
                method: 'get',
                headers: {
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
        fetchHome();
    }, [skip]);

    return (
        <>
            {posts !== null &&
                <DisplayPosts setSkip={setSkip} />
            }
        </>
    )
}