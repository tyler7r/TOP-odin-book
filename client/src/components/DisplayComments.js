import React, { useState, useEffect } from 'react'
import { NewComment } from './NewComment';
import { Link } from 'react-router-dom';
import { formatDate } from '../HelperFunctions/FormatDate'
import { userInitials } from '../HelperFunctions/UserInitials';
import { Comment } from './Comment';
import './Home.css'
import './comment.css'

export const DisplayComments = (props) => {
    const { token, user, postId, posts, setPosts, comments, view, setSkip } = props;

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if ((offsetHeight + scrollTop + 50) >= scrollHeight) {
            setSkip(comments.length)
        }
        console.log(offsetHeight + scrollTop, scrollHeight)
    }

    return (
        <>
            <NewComment user={user} postId={postId} token={token} posts={posts} setPosts={setPosts} comments={comments} />
            <h3>Comments</h3>
            <div className={view} onScroll={handleScroll}>
                {comments.length > 0 &&
                    comments.map(comment => {
                        return (
                            <Comment key={comment._id} token={token} user={user} postId={postId} posts={posts} setPosts={setPosts} comment={comment} />
                        )
                    })
                }
                {comments.length === 0 && 
                    <div>No Comments</div>
                }
            </div>
        </>
    )
}