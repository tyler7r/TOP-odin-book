import React from 'react'
import { Link } from 'react-router-dom';
import { DisplayComments } from './DisplayComments';
import { userInitials } from '../HelperFunctions/UserInitials';
import { formatDate } from '../HelperFunctions/FormatDate'
import './post.css'
import './Home.css';
import { Post } from './Post';

export const DisplayPosts = (props) => {
    const { setPosts, posts, token, user, setSkip } = props;

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if ((offsetHeight + scrollTop + 50) >= scrollHeight) {
            setSkip(posts.length)
        }
    }
 
    return (
        <div className='feed' onScroll={handleScroll}>
            {posts.map(post => {
                return (
                    <div key={post._id} className='post'>
                        <Post token={token} user={user} post={post} postId={post._id} posts={posts} setPosts={setPosts} comments={post.comments} setSkip={setSkip} />
                        <DisplayComments token={token} user={user} post={post} postId={post._id} posts={posts} setPosts={setPosts} comments={post.comments} setSkip={setSkip} />
                    </div>
                )
            })}
        </div>
    )
}