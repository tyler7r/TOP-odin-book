import React from 'react'
import { Link } from 'react-router-dom';
import { DisplayComments } from './DisplayComments';
import isSameWeek from 'date-fns/isSameISOWeek';
import '../styles/home.css';
import '../styles/post.css'

export const DisplayPosts = (props) => {
    const { setPosts, posts, setSkip } = props;

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
        <>
            <h2>Feed</h2>
            <div className='feed' onScroll={handleScroll}>
                {posts.map(post => {
                    return (
                        <div key={post._id} className='post'>
                            <Link to={`/odinbook/g${post.author.url}`}>{post.author.profilePic === undefined ? '' : <img src={post.author.profilePic} alt='profile pic' height={50} width={50} />}</Link>
                            <Link to={`/odinbook/g${post.author.url}`}>{post.author.fullName} @{post.author.username}</Link>
                            <div>Post Details: {post.text}</div>
                            <div>Post Date: {formatDate(post.time)}</div>
                            <div>Likes: {post.likes.length}</div>
                            <div>Comments: {post.comments.length}</div>
                            <h3>Comments</h3>
                            <DisplayComments postId={post._id} posts={posts} setPosts={setPosts} formatDate={formatDate} />
                            <div>=============================</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}