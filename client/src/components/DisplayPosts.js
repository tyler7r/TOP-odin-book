import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DisplayComments } from './DisplayComments';
import { NewComment } from './NewComment';

export const DisplayPosts = (props) => {
    const { setPosts, posts, token, user } = props; 

    const handleLike = async (e) => {
        const postId = e.target.id;

        await fetch(`/odinbook/${postId}/like`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                let copy = [...posts];
                let index = copy.findIndex(post => post._id === postId);
                copy[index] = data.post;
                setPosts([...copy]);
            })

    }

    const handleDelete = async (e) => {
        const postId = e.target.id

        await fetch(`/odinbook/${postId}/delete`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(() => {
                let copy = [...posts];
                let index = copy.findIndex(post => post._id === postId);
                copy.splice(index, 1);
                setPosts([...copy]);
            })
    }

    return (
        <>
            <h2>Feed</h2>
            {posts.map(post => {
                return (
                    <div key={post._id}>
                        <Link to={`/odinbook${post.author.url}`}>{post.author.profilePic === null ? '' : <img src={post.author.profilePic} alt='profile pic' height={50} width={50} />}</Link>
                        <Link to={`/odinbook${post.author.url}`}>{post.author.fullName} @{post.author.username}</Link>
                        <div>{post.text}: {post.time}</div>
                        <div>Likes: {post.likes.length}</div>
                        <div>Comments: {post.comments.length}</div>
                        <button id={post._id} onClick={(e) => handleLike(e)}>Like Post</button>
                        {post.author._id === user._id &&
                            <button id={post._id} onClick={(e) => handleDelete(e)}>Delete Post</button>
                        }
                        <h3>Comments</h3>
                        <DisplayComments user={user} token={token} postId={post._id} posts={posts} setPosts={setPosts} />
                        <div>=============================</div>
                    </div>
                )
            })}
        </>
    )
}