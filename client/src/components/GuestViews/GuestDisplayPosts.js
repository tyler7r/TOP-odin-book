import React from 'react'
import { Link } from 'react-router-dom';
import { GuestDisplayComments } from './GuestDisplayComments';
import isSameWeek from 'date-fns/isSameISOWeek';

export const GuestDisplayPosts = (props) => {
    const { setPosts, posts, token, user, isGuest } = props;

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
 
    return (
        <>
            <h2>Feed</h2>
            {posts.map(post => {
                return (
                    <div key={post._id}>
                        <Link to={`/odinbook${post.author.url}`}>{post.author.profilePic === null ? '' : <img src={post.author.profilePic} alt='profile pic' height={50} width={50} />}</Link>
                        <Link to={`/odinbook${post.author.url}`}>{post.author.fullName} @{post.author.username}</Link>
                        <div>Post Details: {post.text}</div>
                        <div>Post Date: {formatDate(post.time)}</div>
                        <div>Likes: {post.likes.length}</div>
                        <div>Comments: {post.comments.length}</div>
                        <h3>Comments</h3>
                        <GuestDisplayComments user={user} token={token} postId={post._id} posts={posts} setPosts={setPosts} formatDate={formatDate} isGuest={isGuest} />
                        <div>=============================</div>
                    </div>
                )
            })}
        </>
    )
}