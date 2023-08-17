import React from 'react';

export const DeleteModal = (props) => {
    const { server, posts, setPosts, postId, deleteModalOpen, setDeleteModalOpen, post, token } = props;
    
    const handleDelete = async (e) => {
        const pId = e.target.id

        await fetch(`${server}/odinbook/${pId}/delete`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(() => {
                let copy = [...posts];
                let index = copy.findIndex(post => post._id === pId);
                copy.splice(index, 1);
                setPosts([...copy]);
                setDeleteModalOpen(false);
                if (postId === pId) {
                    window.location.href = '/odinbook'
                }
            })
    }

    return (
        <div className='overlay'>
            <div className='delete-modal'>
                <div className='delete-message'>Are you sure you want to delete post?</div>
                <button className='confirm-delete' id={post._id} onClick={(e) => handleDelete(e)}>Confirm</button>
                <button className='cancel-delete' onClick={() => setDeleteModalOpen(false)}>Cancel</button>
            </div>
        </div>
    )
}