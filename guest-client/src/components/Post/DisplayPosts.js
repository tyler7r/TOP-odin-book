import React from 'react'
import { Post } from './Post';
import { DisplayComments } from '../Comment/DisplayComments';
import '../../styles/home.css';
import '../../styles/post.css'

export const DisplayPosts = (props) => {
    const { posts, setSkip } = props;

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if ((offsetHeight + scrollTop + 50) >= scrollHeight) {
            setSkip(posts.length)
        }
    }
 
    return (
        <div>
            <h2>Feed</h2>
            <div className='feed' onScroll={handleScroll}>
                {posts.map(post => {
                    return (
                        <div key={post._id} className='post'>
                            <Post post={post} postId={post._id} posts={posts} />
                            <DisplayComments post={post} comments={post.comments} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}