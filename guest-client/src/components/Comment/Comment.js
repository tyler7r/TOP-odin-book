import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../HelperFunctions/FormatDate'
import { userInitials } from '../../HelperFunctions/UserInitials'

export const Comment = (props) => {
    const { comment } = props

    return (
        <div className='comment'>
            <Link to={`/odinbook/g${comment.author.url}`}>{comment.author.profilePic === undefined ? userInitials(comment.author) : <img src={comment.author.profilePic} alt='profilePic' height={30} width={30} />}</Link>
            <Link to={`/odinbook/g${comment.author.url}`}><div>{comment.author.fullName}</div></Link>
            <div>{comment.text}</div>
            <div>{formatDate(comment.time)}</div>
            <div>Likes: {comment.likes.length}</div>
        </div>
    )
}