import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { formatDate } from '../../HelperFunctions/FormatDate'
import { userInitials } from '../../HelperFunctions/UserInitials';

export const Post = (props) => {
    const { postId } = useParams();
    const { post, pId, posts, setPosts, token, user } = props;

    const handleLike = async (e) => {
        const pId = e.target.id;

        await fetch(`/odinbook/${pId}/like`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                let copy = [...posts];
                let index = copy.findIndex(post => post._id === pId);
                copy[index] = data.post;
                setPosts([...copy]);
            })

    }

    const handleDelete = async (e) => {
        const pId = e.target.id

        await fetch(`/odinbook/${pId}/delete`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(() => {
                let copy = [...posts];
                let index = copy.findIndex(post => post._id === pId);
                copy.splice(index, 1);
                setPosts([...copy]);
                if (postId === pId) {
                    window.location.href = '/odinbook'
                }
            })
    }

    const handleClick = () => {
        window.location.href = `/odinbook/${pId}`
    }

    return (
        <div>
            <Link to={`/odinbook${post.author.url}`}>{post.author.profilePic === undefined ? userInitials(post.author) : <img src={post.author.profilePic} alt='profile pic' height={50} width={50} />}</Link>
            <Link to={`/odinbook${post.author.url}`}>{post.author.fullName} @{post.author.username}</Link>
            <div>{(post.image !== undefined && post.image !== '') ? <img src={post.image} alt='postImage' height={100} width={100} /> : ''} </div>
            <div onClick={() => handleClick()}>
                <div>Post Details: {post.text}</div>
                <div>Post Date: {formatDate(post.time)}</div>
                <div>Likes: {post.likes.length}</div>
                <div>Comments: {post.comments.length}</div>
            </div>
            <button id={post._id} onClick={(e) => handleLike(e)}>Like Post</button>
            {post.author._id === user._id &&
                <button id={post._id} onClick={(e) => handleDelete(e)}>Delete Post</button>
            }
        </div>
    )
}