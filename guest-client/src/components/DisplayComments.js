import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { formatDate } from '../HelperFunctions/FormatDate';
import { userInitials } from '../HelperFunctions/UserInitials';

export const DisplayComments = (props) => {
    const { posts, postId } = props;
    const [postComments, setPostComments] = useState([]);

    useEffect(() => {
        let post = posts.find(post => post._id === postId);
        setPostComments(post.comments);
    }, [])

    return (
        <>
            {postComments.length === 0 && 
                <div>No Comments</div>
            }
            {postComments.length > 0 &&
                postComments.map(comment => {
                    return (
                        <div key={comment._id}>
                            <Link to={`/odinbook${comment.author.url}`}>{comment.author.profilePic === undefined ? userInitials(comment.author) : <img src={comment.author.profilePic} alt='profilePic' height={30} width={30} />}</Link>
                            <Link to={`/odinbook${comment.author.url}`}><div>{comment.author.fullName}</div></Link>
                            <div>{comment.text}</div>
                            <div>{formatDate(comment.time)}</div>
                            <div>Likes: {comment.likes.length}</div>
                        </div>
                    )
                })
            }
        </>
    )
}