import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
    const fetchData = async () => {
        try {
            let res = await fetch(`/odinbook`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let myJson = await res.json();
            console.log(myJson);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>Hello</div>
    )
}