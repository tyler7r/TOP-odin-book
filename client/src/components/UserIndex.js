import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const UserIndex = (props) => {
    const { token, user, updateUser, setUpdateUser, isGuest } = props;
    const [index, setIndex] = useState(null);

    useEffect(() => {
        if (token !== null) {
            getUsers()
        }
    }, [token])

    const getUsers = async () => {
        await fetch(`/odinbook/users/index`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setIndex(data.users);
            })
    }

    const isFriendWithUser = (userCheck) => {
        let friends = userCheck.friends;
        if (friends.some(friend => friend._id === user._id)) {
            return true
        } else return false
    }

    const friendStatus = (userCheck) => {
        let receivedRequests = userCheck.receivedRequests;

        if (isGuest === true) {
            return 'Guest Status'
        }
        if (isFriendWithUser(userCheck) === true) {
            return 'Friend'
        }
        if (receivedRequests.some(request => request.sender === user._id)) {
            return 'Pending Request'
        } else if (checkPendingRequest(userCheck) === true) {
            return 'Request Received'
        } else {
            return 'Not Friend'
        }
    }

    const requestButton = async (e, action) => {
        let userId = e.target.id;
        await fetch(`/odinbook/${userId}/${action}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(res => res.json())
            .then(data => {
                let copy = [...index];
                let updatedUser = copy.findIndex(user => user._id === data.receivingUser._id);
                copy[updatedUser] = data.receivingUser;
                setIndex(copy);
                setUpdateUser(true);
            })
    }

    const checkPendingRequest = (userCheck) => {
        let sentRequests = userCheck.sentRequests
        if (sentRequests.some(request => request.receiver === user._id)) {
            return true
        }
    }

    const handleRequest = async (e, action, user) => {
        let userId = e.target.id;
        let requests = user.sentRequests;
        let request = requests.find(request => request.sender === userId);
        let requestId = request._id;
        await fetch(`/odinbook/${requestId}/${action}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(res => res.json())
            .then(data => {
                let copy = [...index];
                let userIndex = copy.findIndex(user => user._id === data.sender._id);
                copy[userIndex] = data.sender;
                setIndex(copy);
                setUpdateUser(true);
            })
    }

    return (
        <div>
            <Link to='/odinbook'>Back Home</Link>
            {index !== null && 
                index.map(user => {
                    return (
                        <div key={user._id}>
                            <Link to={`/odinbook${user.url}`}>{user.fullName} @{user.username}</Link>
                            {friendStatus(user) === 'Guest Status' && 
                                <></>
                            }
                            {friendStatus(user) === 'Friend' && 
                                <button id={user._id} onClick={(e) => requestButton(e, 'unfriend')}>Unfriend</button>
                            }
                            {friendStatus(user) === 'Pending Request' &&
                                <button id={user._id} onClick={(e) => requestButton(e, 'request')}>Pending Request</button>
                            }
                            {friendStatus(user) === 'Not Friend' &&
                                <button id={user._id} onClick={(e) => requestButton(e, 'request')}>Send Friend Request</button>
                            }
                            {friendStatus(user) === 'Request Received' && 
                                <>
                                    <button id={user._id} onClick={(e) => handleRequest(e, 'accept', user)}>Accept</button>
                                    <button id={user._id} onClick={(e) => handleRequest(e, 'reject', user)}>Reject</button>
                                </>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
