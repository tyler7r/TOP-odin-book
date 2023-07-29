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
    const [skip, setSkip] = useState(0)

    const getPost = async () => {
        await fetch(`/odinbook/${postId}?skip=${skip}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(res => res.json())
            .then(data => {
                if (skip === 0) {
                    setComments(data.comments)
                } else {
                    setComments([...comments, ...data.comments])
                }
                setPost(data.post);
            })
    }

    useEffect(() => {
        if (token !== null) {
            getPost()
        }
    }, [skip, token])

    return (
        <div>
            <Header user={user} />
            {post !== null &&
            <div>
                <Post token={token} user={user} post={post} postId={post._id} posts={[post]} setPosts={getPost} />
                {comments !== null &&
                    <DisplayComments token={token} user={user} postId={postId} posts={[post]} setPosts={getPost} comments={comments} view={'feed'} setSkip={setSkip} />
                }
            </div>
            }
        </div>
    )
}