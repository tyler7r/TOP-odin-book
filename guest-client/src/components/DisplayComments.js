import React, { useState, useEffect } from 'react'
import { Comment } from './Comment';
import { Link } from 'react-router-dom';
import { formatDate } from '../HelperFunctions/FormatDate';
import { userInitials } from '../HelperFunctions/UserInitials';
import '../styles/home.css'
import '../styles/comment.css'

export const DisplayComments = (props) => {
    const { setSkip, comments, view } = props;

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if ((offsetHeight + scrollTop + 50) >= scrollHeight) {
            setSkip(comments.length)
        }
    }

    return (
        <div className={view} onScroll={handleScroll}>
            {comments.length > 0 &&
                comments.map(comment => {
                    return (
                        <Comment key={comment._id} comment={comment} />
                    )
                })
            }
            {comments.length === 0 && 
                <div>No Comments</div>
            }
        </div>
    )
}