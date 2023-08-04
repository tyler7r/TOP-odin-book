import React from 'react';
import { Link } from 'react-router-dom';
import { isProfilePicAvailable } from '../HelperFunctions/CheckForProfilePic';
import { userInitials } from '../HelperFunctions/UserInitials';
import '../styles/request-modal.css'

export const RequestModal = (props) => {
    const { requests, token, setRequests, setProfileData, profileData, setRequestModalOpen } = props;

    const handleRequest = async (e, action) => {
        const requestId = e.target.id;
        await fetch(`/odinbook/${requestId}/${action}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(res => res.json())
            .then(data => {
                if (action === 'accept') setProfileData({...profileData, friends: data.receiver.friends})
                setRequests(data.receivedRequests);
            })
    }

    return (
        <div className="overlay">
            <div id='requests-modal'>
            <div className="modal-header">
                <div className='modal-title'>Requests</div>
                <div className='close-modal-btn' onClick={() => setRequestModalOpen(false)}>X</div>
            </div>
                {(requests !== null && requests.length !== 0)
                    ? requests.map(request => {
                        return (
                            <div key={request._id} className='request'>
                                <Link to={`/odinbook/users/${request.sender._id}`} className='request-user-container'>
                                    {isProfilePicAvailable(request.sender) === false 
                                    ? <div className='user-initials'>{userInitials(request.sender)}</div>
                                    : <img src={request.sender.profilePic} className='request-profile-pic'/>
                                    }
                                    <div className="request-name-container">
                                        <div className='request-fullName'>{request.sender.fullName}</div>
                                        <div className='request-username'>@{request.sender.username}</div>
                                    </div>
                                </Link>
                                <div className="request-btn-container">
                                    <button className='friend-status-btn accept-request' id={request._id} onClick={(e) => handleRequest(e, 'accept')}>Accept</button>
                                    <button className='friend-status-btn reject-request' id={request._id} onClick={(e) => handleRequest(e, 'reject')}>Reject</button>
                                </div>
                            </div>
                        )
                    })
                    : <div className='no-items-msg'>No Requests Found</div>
                }
            </div>
        </div>
    )
}