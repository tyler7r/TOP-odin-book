import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { GuestUserIndex } from './GuestViews/GuestUserIndex';
import { DisplayUsers } from './DisplayUsers';

export const UserIndex = (props) => {
    const { token, user, isGuest } = props;
    const [index, setIndex] = useState(null);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        if (token !== null) {
            getUsers()
        }
    }, [token])

    const getUsers = async () => {
        await fetch(`/odinbook/users/index?skip=${skip}`, {
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

    // const isFriendWithUser = (currentUserIndex) => {
    //     let friends = currentUserIndex.friends;
    //     if (friends.some(friend => friend._id === user._id)) {
    //         return true
    //     } else return false
    // }

    // const requestReceivedFromIndexedUser = (currentUserIndex) => {
    //     let sentRequests = currentUserIndex.sentRequests;
    //     if (sentRequests.some(request => request.receiver === user._id)) {
    //         return true
    //     }
    // }

    // const requestSentByCurrentUser = (currentUserIndex) => {
    //     let receivedRequests = currentUserIndex.receivedRequests;
    //     if (receivedRequests.some(request => request.sender === user._id)) {
    //         return true
    //     }
    // }

    // const statusWithCurrentUser = (currentUserIndex) => {
    //     if (isGuest === true) {
    //         return 'Guest Status'
    //     }
    //     if (isFriendWithUser(currentUserIndex) === true) {
    //         return 'Friend'
    //     }
    //     if (requestSentByCurrentUser(currentUserIndex) === true) {
    //         return 'Pending Request'
    //     } else if (requestReceivedFromIndexedUser(currentUserIndex) === true) {
    //         return 'Request Received'
    //     } else {
    //         return 'Not Friend'
    //     }
    // }

    // const requestButton = async (e, action) => {
    //     let userId = e.target.id;
    //     await fetch(`/odinbook/${userId}/${action}`, {
    //         method: 'get',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': token,
    //         }
    //     }).then(res => res.json())
    //         .then(data => {
    //             let copy = [...index];
    //             let updatedUser = copy.findIndex(user => user._id === data.receivingUser._id);
    //             copy[updatedUser] = data.receivingUser;
    //             setIndex(copy);
    //         })
    // }

    // const handleRequest = async (e, action, user) => {
    //     let userId = e.target.id;
    //     let requests = user.sentRequests;
    //     let request = requests.find(request => request.sender === userId);
    //     let requestId = request._id;
    //     await fetch(`/odinbook/${requestId}/${action}`, {
    //         method: 'get',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': token,
    //         }
    //     }).then(res => res.json())
    //         .then(data => {
    //             let copy = [...index];
    //             let userIndex = copy.findIndex(user => user._id === data.sender._id);
    //             copy[userIndex] = data.sender;
    //             setIndex(copy);
    //         })
    // }

    return (
        <div>
            {isGuest === true 
            ? <GuestUserIndex token={token} user={user} />
            : <>
                <Header user={user} />
                <h2>Users</h2>
                {index !== null
                    ? <DisplayUsers token={token} user={user} setUsers={setIndex} users={index} setSkip={setSkip} />
                    : <div>No users found</div>
                }
            </>
            }
        </div>
    )
}
