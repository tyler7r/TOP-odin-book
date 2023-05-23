import React, { useEffect, useState } from 'react'
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
                setPosts(data.posts)
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
            .then(data => {
                setPosts(data.posts)
            })
    }

    return (
        <>
            <h2>Feed</h2>
            {posts.map(post => {
                return (
                    <div key={post._id}>
                        <div>{post.author.fullName} @{post.author.username}</div>
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