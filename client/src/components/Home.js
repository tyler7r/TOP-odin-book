import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NewPost } from './NewPost';
import { DisplayPosts } from './DisplayPosts';

export const Home = () => {
    const [data, setData] = useState(null);
    // const [errors, setErrors] = useState(null);
    
    const fetchHome = async () => {
        let token = JSON.parse(localStorage.getItem('token'));
        let bearer = `Bearer ${token}`
        let res = await fetch('/odinbook', {
            method: 'get',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
        let myJson = await res.json();
        setData(myJson);
    }

    useEffect(() => {
        fetchHome()
    }, []);

    return (
        <>
            <h1>Home Page</h1>
            {data !== null &&
                <>
                    <Link to={`/odinbook${data.user.url}`}>{data.user.fullName} @{data.user.username}</Link>
                    <NewPost user={data.user}/>
                    <DisplayPosts posts={data.posts} />
                </>
            }
        </>
    )
}