import React from 'react';

export const DeleteCommentModal = (props) => {
    const { server, posts, setPosts, postId, deleteModalOpen, setDeleteModalOpen, comment, token } = props;
    
    const handleDelete = async (e) => {
        const commentId = e.target.id;

        await fetch(`${server}/odinbook/${postId}/${commentId}/delete`, {
            method: 'get',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                let copy = [...posts];
                let index = posts.findIndex(post => post._id === postId);
                copy[index] = data.post;
                setDeleteModalOpen(false)
                setPosts(copy);
            })
    }

    return (
        <div className='overlay'>
            <div className='delete-modal'>
                <div className='delete-message'>Are you sure you want to delete comment?</div>
                <button className='confirm-delete' id={comment._id} onClick={(e) => handleDelete(e)}>Confirm</button>
                <button className='cancel-delete' onClick={() => setDeleteModalOpen(false)}>Cancel</button>
            </div>
        </div>
    )
}