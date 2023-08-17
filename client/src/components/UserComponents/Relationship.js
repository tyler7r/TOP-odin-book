import React from 'react'

export const Relationship = (props) => {
    const { server, token, user, setUsers, users, indexedUser } = props;

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
        await fetch(`${server}/odinbook/${userId}/${action}`, {
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
        await fetch(`${server}/odinbook/${requestId}/${action}`, {
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

    return (
        <>
            {statusWithCurrentUser(indexedUser) === 'Current User' &&
                <></>
            }
            {statusWithCurrentUser(indexedUser) === 'Friend' && 
                <button className='friend-status-btn unfriend-btn' id={indexedUser._id} onClick={(e) => requestButton(e, 'unfriend')}>Unfriend</button>
            }
            {statusWithCurrentUser(indexedUser) === 'Pending Request' &&
                <button className='friend-status-btn' id={indexedUser._id} onClick={(e) => requestButton(e, 'request')}>Pending Request</button>
            }
            {statusWithCurrentUser(indexedUser) === 'Not Friend' &&
                <button className='friend-status-btn' id={indexedUser._id} onClick={(e) => requestButton(e, 'request')}>Send Friend Request</button>
            }
            {statusWithCurrentUser(indexedUser) === 'Request Received' && 
                <div className='handle-request-container'>
                    <div className='request-received-message'>*Request Received*</div>
                    <button id={indexedUser._id} className='accept-request friend-status-btn' onClick={(e) => handleRequest(e, 'accept', indexedUser)}>Accept</button>
                    <button id={indexedUser._id} className='reject-request friend-status-btn' onClick={(e) => handleRequest(e, 'reject', indexedUser)}>Reject</button>
                </div>
            }
        </>
    )
}