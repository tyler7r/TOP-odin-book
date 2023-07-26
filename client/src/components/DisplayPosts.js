import React from 'react'
import { Link } from 'react-router-dom';
import { DisplayComments } from './DisplayComments';
import isSameWeek from 'date-fns/isSameISOWeek';
import './post.css'
import './Home.css';

export const DisplayPosts = (props) => {
    const { setPosts, posts, token, user, setSkip } = props;

    const handleLike = async (e) => {
        const postId = e.target.id;

        await fetch(`/odinbook/${postId}/like`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                let copy = [...posts];
                let index = copy.findIndex(post => post._id === postId);
                copy[index] = data.post;
                setPosts([...copy]);
            })

    }

    const handleDelete = async (e) => {
        const postId = e.target.id

        await fetch(`/odinbook/${postId}/delete`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(() => {
                let copy = [...posts];
                let index = copy.findIndex(post => post._id === postId);
                copy.splice(index, 1);
                setPosts([...copy]);
            })
    }

    const formatDate = (date) => {
        const formatted = new Date(date);
        const today = new Date();
        // posted today
        if (formatted.toDateString() === today.toDateString()) {
            let todayOptions = {
                hour: 'numeric', minute: 'numeric'
            }
            return formatted.toLocaleTimeString('en-us', todayOptions)
        }
        // posted in same week
        if (isSameWeek(today, formatted) === true) {
            let sameWeekOptions = {
                weekday: 'short'
            }
            return formatted.toLocaleString('en-us', sameWeekOptions)
        } 
        // posted in the same calendar year
        if (formatted.getFullYear() === today.getFullYear()) {
            let sameYearOptions = {
                month: 'short', day: 'numeric'
            }
            return formatted.toLocaleString('en-us', sameYearOptions)
        }
        // posted outside current calendar year
        let options = {
            year: 'numeric', month: 'short', day: 'numeric'
        }
        return formatted.toLocaleString('en-us', options);
    }

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(posts.length)
        }
    }
 
    return (
        <div className='feed' onScroll={handleScroll}>
            <h2>Feed</h2>
            {/* {console.log(posts)} */}
            {posts.map(post => {
                return (
                    <div key={post._id} className='post'>
                        <Link to={`/odinbook${post.author.url}`}>{post.author.profilePic === null ? '' : <img src={post.author.profilePic} alt='profile pic' height={50} width={50} />}</Link>
                        <Link to={`/odinbook${post.author.url}`}>{post.author.fullName} @{post.author.username}</Link>
                        <div>{(post.image !== undefined && post.image !== '') ? <img src={post.image} alt='postImage' height={100} width={100} /> : ''} </div>
                        <div>Post Details: {post.text}</div>
                        <div>Post Date: {formatDate(post.time)}</div>
                        <div>Likes: {post.likes.length}</div>
                        <div>Comments: {post.comments.length}</div>
                        <button id={post._id} onClick={(e) => handleLike(e)}>Like Post</button>
                        {post.author._id === user._id &&
                            <button id={post._id} onClick={(e) => handleDelete(e)}>Delete Post</button>
                        }
                        <h3>Comments</h3>
                        <DisplayComments user={user} token={token} postId={post._id} posts={posts} setPosts={setPosts} formatDate={formatDate} />
                        <div>=============================</div>
                    </div>
                )
            })}
        </div>
    )
}