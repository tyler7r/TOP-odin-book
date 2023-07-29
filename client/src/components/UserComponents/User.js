import React from 'react'
import { Link } from 'react-router-dom';
import { userInitials } from '../../HelperFunctions/UserInitials';
import '../../styles/user.css'

export const User = (props) => {
    const { token, user, users, setUsers, currentUser } = props

    const isFriendWithUser = (currentUserIndex) => {
        let friends = currentUserIndex.friends;
        if (friends.some(friend => friend._id === currentUser._id)) {
            return true
        } else return false
    }

    const requestReceivedFromIndexedUser = (currentUserIndex) => {
        let sentRequests = currentUserIndex.sentRequests;
        if (sentRequests.some(request => request.receiver === currentUser._id)) {
            return true
        }
    }

    const requestSentByCurrentUser = (currentUserIndex) => {
        let receivedRequests = currentUserIndex.receivedRequests;
        if (receivedRequests.some(request => request.sender === currentUser._id)) {
            return true
        }
    }

    const statusWithCurrentUser = (currentUserIndex) => {
        if (currentUserIndex._id === currentUser._id) {
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
                console.log(data);
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
                console.log(data);
                let copy = [...users];
                let userIndex = copy.findIndex(user => user._id === data.sender._id);
                copy[userIndex] = data.sender;
                setUsers(copy);
            })
    }

    return (
        <div className='user'>
            <Link to={`/odinbook${user.url}`}>{user.profilePic === undefined ? userInitials(user) : <img src={user.profilePic} alt='profile pic' height={50} width={50} />}</Link>
            <Link to={`/odinbook${user.url}`}>{user.fullName} @{user.username}</Link>
            {statusWithCurrentUser(user) === 'Current User' &&
                <></>
            }
            {statusWithCurrentUser(user) === 'Friend' && 
                <button id={user._id} onClick={(e) => requestButton(e, 'unfriend')}>Unfriend</button>
            }
            {statusWithCurrentUser(user) === 'Pending Request' &&
                <button id={user._id} onClick={(e) => requestButton(e, 'request')}>Pending Request</button>
            }
            {statusWithCurrentUser(user) === 'Not Friend' &&
                <button id={user._id} onClick={(e) => requestButton(e, 'request')}>Send Friend Request</button>
            }
            {statusWithCurrentUser(user) === 'Request Received' && 
                <>
                    <button id={user._id} onClick={(e) => handleRequest(e, 'accept', user)}>Accept</button>
                    <button id={user._id} onClick={(e) => handleRequest(e, 'reject', user)}>Reject</button>
                </>
            }
        </div>
    )
}