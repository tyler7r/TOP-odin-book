import React from 'react'
import { DisplayComments } from '../CommentComponents/DisplayComments';
import { Post } from './Post';
import '../../styles/post.css'
import '../../styles/home.css'

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
            <h3 className='feed-title'>FEED</h3>
            {posts.map(post => {
                return (  
                    <div className='post' key={post._id}>
                        <Post token={token} user={user} post={post} pId={post._id} posts={posts} setPosts={setPosts} />
                    </div>
                )
            })}
        </div>
    )
}