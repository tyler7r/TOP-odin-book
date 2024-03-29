import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Header } from '../Header';
import { Post } from './Post';
import { DisplayComments } from '../Comment/DisplayComments';
import '../../styles/home.css'

export const ExpandPost = (props) => {
    const { server } = props;
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)
    const [skip, setSkip] = useState(0)

    const getPost = async () => {
        await fetch(`${server}/odinbook/g/${postId}?skip=${skip}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
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
        getPost()
    }, [skip])

    return (
        <div>
            <Header />
            {post !== null &&
                <div className='post'>
                    <Post post={post} postId={post._id} />
                    {comments !== null &&
                        <DisplayComments comments={comments} view={'feed'} setSkip={setSkip} />
                    }
                </div>
            }
        </div>
    )
}