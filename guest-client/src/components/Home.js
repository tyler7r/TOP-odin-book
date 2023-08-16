import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DisplayPosts } from './Post/DisplayPosts';
import { Header } from './Header';
import { SearchBar } from './SearchBar';

export const Home = (props) => {
    const { host } = props;
    const [posts, setPosts] = useState(null);
    const [view, setView] = useState('recent');
    const [searchOpen, setSearchOpen] = useState(false);
    const [skip, setSkip] = useState(0);
    
    const fetchHome = async () => {
        const server = process.env.REACT_APP_SERVER_URL
        try {
            await fetch(`${server}/odinbook/g/home?skip=${skip}&view=${view}`, {
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

    const checkView = (buttonView) => {
        if (view === buttonView) {
            return 'view-select selected'
        } else {
            return 'view-select'
        }
    }

    return (
        <div>
            <Header setSearchOpen={setSearchOpen} searchOpen={searchOpen} searchBtnVisible={true} />
            {searchOpen &&
                <SearchBar setSearchOpen={setSearchOpen} />
            }
            <div className="view-select-menu">
                <button className={checkView('recent')} onClick={() => setView('recent')}>Recent</button>
                <button className={checkView('popular')} onClick={() => setView('popular')}>Popular</button>
            </div>
            {posts !== null &&
                <DisplayPosts posts={posts} setSkip={setSkip} />
            }
        </div>
    )
}