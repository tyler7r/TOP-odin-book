import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import './user.css'

export const DisplayUsers = (props) => {
    const { token, user, users, setUsers, setSkip } = props;

    const isFriendWithUser = (currentUserIndex) => {
        let friends = currentUserIndex.friends;
        if (friends.some(friend => friend._id === user._id)) {
            return true
        } else return false
    }

    const requestReceivedFromIndexedUser = (currentUserIndex) => {
        let sentRequests = currentUserIndex.sentRequests;
        if (sentRequests.some(request => request.receiver === user._id)) {
            return true
        }
    }

    const requestSentByCurrentUser = (currentUserIndex) => {
        let receivedRequests = currentUserIndex.receivedRequests;
        if (receivedRequests.some(request => request.sender === user._id)) {
            return true
        }
    }

    const statusWithCurrentUser = (currentUserIndex) => {
        if (currentUserIndex._id === user._id) {
            return 'Current User'
        }
        if (isFriendWithUser(currentUserIndex) === true) {
            return 'Friend'
        }
        if (requestSentByCurrentUser(currentUserIndex) === true) {
            return 'Pending Request'
        } else if (requestReceivedFromIndexedUser(currentUserIndex) === true) {
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
                let copy = [...users];
                let updatedUser = copy.findIndex(user => user._id === data.receivingUser._id);
                copy[updatedUser] = data.receivingUser;
                setUsers(copy);
            })
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
                let copy = [...users];
                let userIndex = copy.findIndex(user => user._id === data.sender._id);
                copy[userIndex] = data.sender;
                setUsers(copy);
            })
    }

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(users.length)
        }
        console.log(offsetHeight + scrollTop, scrollHeight)
    }

    return (
        <div className='feed' onScroll={handleScroll}>
            {users !== null &&
                users.map(indexedUser => {
                    return (
                        <div key={indexedUser._id} className='user'>
                            <Link to={`/odinbook${indexedUser.url}`}>{indexedUser.profilePic === null ? '' : <img src={indexedUser.profilePic} alt='profile pic' height={50} width={50} />}</Link>
                            <Link to={`/odinbook${indexedUser.url}`}>{indexedUser.fullName} @{indexedUser.username}</Link>
                            {statusWithCurrentUser(indexedUser) === 'Current User' && 
                                <></>
                            }
                            {statusWithCurrentUser(indexedUser) === 'Friend' && 
                                <button id={indexedUser._id} onClick={(e) => requestButton(e, 'unfriend')}>Unfriend</button>
                            }
                            {statusWithCurrentUser(indexedUser) === 'Pending Request' &&
                                <button id={indexedUser._id} onClick={(e) => requestButton(e, 'request')}>Pending Request</button>
                            }
                            {statusWithCurrentUser(indexedUser) === 'Not Friend' &&
                                <button id={indexedUser._id} onClick={(e) => requestButton(e, 'request')}>Send Friend Request</button>
                            }
                            {statusWithCurrentUser(indexedUser) === 'Request Received' && 
                                <>
                                    <button id={indexedUser._id} onClick={(e) => handleRequest(e, 'accept', indexedUser)}>Accept</button>
                                    <button id={indexedUser._id} onClick={(e) => handleRequest(e, 'reject', indexedUser)}>Reject</button>
                                </>
                            }
                        </div>
                    )
                })
            }
            {(users === null || users.length === 0) &&
                <div>No users to display</div>
            }
        </div>
    )
}