import React from 'react'
import { Comment } from './Comment';
import '../../styles/home.css'
import '../../styles/comment.css'

export const DisplayComments = (props) => {
    const { setSkip, comments, view } = props;

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if ((offsetHeight + scrollTop + 50) >= scrollHeight) {
            setSkip(comments.length)
        }
    }

    return (
        <div className="comment-container">
            <h3>Comments</h3>
            <div className='comment-section' onScroll={handleScroll}>
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
        </div>
    )
}