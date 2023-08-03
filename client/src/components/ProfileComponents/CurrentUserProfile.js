import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProfileHeader } from './ProfileHeader';
import { ProfileInfo } from './ProfileInfo';
import { DisplayPosts } from '../PostComponents/DisplayPosts';
import { NewPost } from '../PostComponents/NewPost';
import { Header } from '../Header';

export const CurrentUserProfile = (props) => {
    const { userId } = useParams();
    const { token, user } = props;
    const [profileData, setProfileData] = useState(null)
    const [profilePosts, setProfilePosts] = useState(null);
    const [requests, setRequests] = useState(null);
    const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [formData, setFormData] = useState('');
    const [skip, setSkip] = useState(0);

    const fetchCurrentUserProfile = async () => {
        await fetch(`/odinbook/users/${userId}?skip=${skip}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(res => res.json())
            .then(data => {
                setProfileData(data.data);
                setRequests(data.receivedRequests);
                setFormData({...formData, bio: data.data.profileBio });
                if (skip === 0) {
                    setProfilePosts(data.posts);
                } else {
                    setProfilePosts([...profilePosts, ...data.posts])
                }
            })
    }

    useEffect(() => {
        fetchCurrentUserProfile();
    }, [skip])

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
        <div>
            <Header user={user} setEditProfileModalOpen={setEditProfileModalOpen} editProfileModalOpen={editProfileModalOpen} editProfileBtnVisible={true} requestModalOpen={requestModalOpen} setRequestModalOpen={setRequestModalOpen} requestBtnVisible={true} />
            {profileData !== null &&
                <ProfileHeader profileData={profileData} />
            }
            {profilePosts !== null &&
                <>
                    {editProfileModalOpen === false &&
                        <div className='profile-interaction-container'>
                            <h3>Friend Requests</h3>
                            {requests !== null &&
                                requests.map(request => {
                                    return ( 
                                        <div key={request._id}>
                                            <Link to={`/odinbook/users/${request.sender._id}`}>{request.sender.fullName}</Link>
                                            <button id={request._id} onClick={(e) => handleRequest(e, 'accept')}>Accept</button>
                                            <button id={request._id} onClick={(e) => handleRequest(e, 'reject')}>Reject</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    {editProfileModalOpen === true && 
                        <ProfileInfo setEditProfileModalOpen={setEditProfileModalOpen} token={token} setProfileData={setProfileData} profileData={profileData} formData={formData} setFormData={setFormData} />
                    }
                    <DisplayPosts token={token} user={user} posts={profilePosts} setPosts={setProfilePosts} setSkip={setSkip} />
                </>
            }
            {profilePosts === null &&
                <div>No user data found</div>
            }
        </div>
    )
}