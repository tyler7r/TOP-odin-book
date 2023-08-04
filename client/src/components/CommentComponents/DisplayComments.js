import React from 'react'
import { NewComment } from './NewComment';
import { Comment } from './Comment';
import '../../styles/home.css'
import '../../styles/comment.css'

export const DisplayComments = (props) => {
    const { token, user, postId, posts, setPosts, comments, view } = props;

    return (
        <div className='comment-container'>
            <NewComment user={user} postId={postId} token={token} posts={posts} setPosts={setPosts} comments={comments} />
            <h3>Comments</h3>
            <div className='comment-section'>
                {comments.length > 0 &&
                    comments.map(comment => {
                        return (
                            <Comment key={comment._id} token={token} user={user} postId={postId} posts={posts} setPosts={setPosts} comment={comment} />
                        )
                    })
                }
                {comments.length === 0 && 
                    <div className='no-items-msg'>No Comments</div>
                }
            </div>
        </div>
    )
}