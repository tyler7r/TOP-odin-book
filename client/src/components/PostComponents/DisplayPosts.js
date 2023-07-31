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
            {posts.map(post => {
                return (
                    <div key={post._id}>
                        <h3>Posts</h3>
                        <div className='post'>
                            <Post token={token} user={user} post={post} pId={post._id} posts={posts} setPosts={setPosts} />
                            <DisplayComments token={token} user={user} post={post} postId={post._id} posts={posts} setPosts={setPosts} comments={post.comments} setSkip={setSkip} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}