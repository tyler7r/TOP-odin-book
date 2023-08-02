import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FriendsFeed } from './FeedViews/FriendsFeed';
import { RecentFeed } from './FeedViews/RecentFeed';
import { PopularFeed } from './FeedViews/PopularFeed';
import { SearchBar } from './SearchBar';
import { Header } from './Header';
import '../styles/home.css'

export const Home = (props) => {
    const { user, token } = props;
    const [searchOpen, setSearchOpen] = useState(false);
    const [newPostOpen, setNewPostOpen] = useState(false)
    const [view, setView] = useState('friends');

    const viewSelector = (view) => {
        if (view === 'recent') {
            return <RecentFeed setView={setView} view={view} token={token} user={user} newPostOpen={newPostOpen} setNewPostOpen={setNewPostOpen} />
        } else if (view === 'friends') {
            return <FriendsFeed setView={setView} view={view} token={token} user={user} newPostOpen={newPostOpen} setNewPostOpen={setNewPostOpen} />
        } else if (view === 'popular') {
            return <PopularFeed setView={setView} view={view} token={token} user={user} newPostOpen={newPostOpen} setNewPostOpen={setNewPostOpen} />
        }
    }

    const checkView = (buttonView) => {
        if (view === buttonView) {
            return 'view-select selected'
        } else {
            return 'view-select'
        }
    }

    return (
        <>
            {token !== null &&
                <div>
                    <Header user={user} searchOpen={searchOpen} setSearchOpen={setSearchOpen} searchBtnVisible={true} newPostOpen={newPostOpen} setNewPostOpen={setNewPostOpen} newPostVisible={true} />
                    {searchOpen &&
                        <SearchBar token={token} user={user} setSearchOpen={setSearchOpen} />
                    }
                    <div id="home-menu">
                        <button className={checkView('friends')} onClick={() => setView('friends')}>Friends</button>
                        <button className={checkView('recent')} onClick={() => setView('recent')}>Recent</button>
                        <button className={checkView('popular')} onClick={() => setView('popular')}>Popular</button>
                    </div>
                    {viewSelector(view)}
                </div>
            }
        </>
    )
}