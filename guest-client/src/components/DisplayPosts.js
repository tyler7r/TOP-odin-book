import React from 'react'
import { Link } from 'react-router-dom';
import { DisplayComments } from './DisplayComments';
import { formatDate } from '../HelperFunctions/FormatDate'
import { userInitials } from '../HelperFunctions/UserInitials';
import '../styles/home.css';
import '../styles/post.css'

export const DisplayPosts = (props) => {
    const { posts, setSkip } = props;

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if ((offsetHeight + scrollTop + 50) >= scrollHeight) {
            setSkip(posts.length)
        }
    }
 
    return (
        <>
            <h2>Feed</h2>
            <div className='feed' onScroll={handleScroll}>
                {posts.map(post => {
                    return (
                        <div key={post._id} className='post'>
                            <Link to={`/odinbook/g${post.author.url}`}>{post.author.profilePic === undefined ? userInitials(post.author) : <img src={post.author.profilePic} alt='profile pic' height={50} width={50} />}</Link>
                            <Link to={`/odinbook/g${post.author.url}`}>{post.author.fullName} @{post.author.username}</Link>
                            <div>{(post.image !== undefined && post.image !== '') ? <img src={post.image} alt='postImage' height={100} width={100} /> : ''} </div>
                            <div>Post Details: {post.text}</div>
                            <div>Post Date: {formatDate(post.time)}</div>
                            <div>Likes: {post.likes.length}</div>
                            <div>Comments: {post.comments.length}</div>
                            <h3>Comments</h3>
                            <DisplayComments postId={post._id} posts={posts} />
                            <div>=============================</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}