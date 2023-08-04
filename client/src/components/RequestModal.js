import React from 'react';
import { Link } from 'react-router-dom';

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
            <div onClick={() => setRequestModalOpen(false)}>X</div>
                {(requests !== null && requests.length !== 0)
                    ? requests.map(request => {
                        return (
                            <div key={request._id}>
                                <Link to={`/odinbook/users/${request.sender._id}`}>{request.sender.fullName}</Link>
                                <button id={request._id} onClick={(e) => handleRequest(e, 'accept')}>Accept</button>
                                <button id={request._id} onClick={(e) => handleRequest(e, 'reject')}>Reject</button>
                            </div>
                        )
                    })
                    : <div>No Requests</div>
                }
            </div>
        </div>
    )
}