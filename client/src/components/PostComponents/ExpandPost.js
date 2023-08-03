import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Header } from '../Header';
import { Post } from './Post';
import { DisplayComments } from '../CommentComponents/DisplayComments';
import '../../styles/home.css'

export const ExpandPost = (props) => {
    const { token, user } = props
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)

    const getPost = async () => {
        await fetch(`/odinbook/${postId}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(res => res.json())
            .then(data => {
                // console.log(data.post)
                // if (skip === 0) {
                //     setComments(data.comments)
                // } else {
                //     setComments([...comments, ...data.comments])
                // }
                setPost(data.post);
                setComments(data.comments);
            })
    }

    useEffect(() => {
        if (token !== null) {
            getPost()
        }
    }, [token])

    return (
        <div>
            <Header user={user} />
            {post !== null &&
            <div className='post'>
                <Post token={token} user={user} post={post} postId={post._id} posts={[post]} setPosts={getPost} />
                {comments !== null &&
                    <DisplayComments token={token} user={user} postId={postId} posts={[post]} setPosts={getPost} comments={comments} view={'feed'} />
                }
            </div>
            }
        </div>
    )
}