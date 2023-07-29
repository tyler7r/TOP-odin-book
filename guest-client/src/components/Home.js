import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DisplayPosts } from './DisplayPosts';
import { Header } from './Header';
import { SearchBar } from './SearchBar';

export const Home = (props) => {
    const { } = props;
    const [posts, setPosts] = useState(null);
    const [view, setView] = useState('recent');
    const [skip, setSkip] = useState(0);
    
    const fetchHome = async () => {
        try {
            await fetch(`/odinbook/g?skip=${skip}&view=${view}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                    if (skip === 0) {
                        setPosts(data.posts)
                    } else {
                        setPosts([...posts, ...data.posts])
                    }
                })
        } catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchHome();
    }, [skip, view]);

    useEffect(() => {
        if (skip !== 0) {
            setSkip(0)
        }
    }, [view])

    return (
        <div>
            <Header />
            <Link to='/odinbook/g/users/index'>User Index</Link>
            <SearchBar />
            <button onClick={() => setView('recent')}>Recent</button>
            <button onClick={() => setView('popular')}>Popular</button>
            {posts !== null &&
                <DisplayPosts posts={posts} setSkip={setSkip} />
            }
        </div>
    )
}