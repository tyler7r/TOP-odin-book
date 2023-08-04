import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProfileHeader } from './ProfileHeader';
import { EditProfile } from './EditProfile';
import { RequestModal } from '../RequestModal';
import { DisplayPosts } from '../PostComponents/DisplayPosts';
import { Header } from '../Header';

export const CurrentUserProfile = (props) => {
    const { userId } = useParams();
    const { token, user } = props;
    const [profileData, setProfileData] = useState(null)
    const [profilePosts, setProfilePosts] = useState(null);
    const [requests, setRequests] = useState([]);
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
                setFormData({bio: data.data.profileBio, profilePic: data.data.profilePic });
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

    return (
        <>
            <Header user={user} setEditProfileModalOpen={setEditProfileModalOpen} editProfileModalOpen={editProfileModalOpen} editProfileBtnVisible={true} requestModalOpen={requestModalOpen} setRequestModalOpen={setRequestModalOpen} requestBtnVisible={true} requestAmount={requests.length} />
            {profileData !== null &&
                <ProfileHeader profileData={profileData} />
            }
            {profilePosts !== null &&
                <div className='profile-feed'>
                    {requestModalOpen &&
                        <RequestModal requests={requests} setProfileData={setProfileData} profileData={profileData} token={token} setRequestModalOpen={setRequestModalOpen} setRequests={setRequests} />
                    }
                    {editProfileModalOpen &&
                        <EditProfile setEditProfileModalOpen={setEditProfileModalOpen} token={token} setProfileData={setProfileData} profileData={profileData} formData={formData} setFormData={setFormData} />
                    }
                    <DisplayPosts token={token} user={user} posts={profilePosts} setPosts={setProfilePosts} setSkip={setSkip} />
                </div>
            }
            {profilePosts === null &&
                <div className='no-items-msg'>No user data found</div>
            }
        </>
    )
}