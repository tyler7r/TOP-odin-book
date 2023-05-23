import React, { useEffect, useState } from 'react'

export const DisplayPosts = (props) => {
    const { posts } = props;

    return (
        <>
            {posts === undefined &&
                <div>No Posts</div>
            }
            {posts.map(post => {
                return (
                    <div key={post._id}>
                        <div>{post.author.fullName} @{post.author.username}</div>
                        <div>{post.text}: {post.time}</div>
                        <div>==============</div>
                    </div>
                )
            })}
        </>
    )
}