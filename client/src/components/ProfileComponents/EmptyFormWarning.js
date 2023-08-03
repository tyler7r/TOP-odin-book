import React from 'react';
import '../../styles/form-warning.css'

export const EmptyFormWarning = (props) => {
    const { setEmptyFormWarning, handleSubmit, checkForEmptyProfileBio, checkForEmptyProfilePic } = props;

    const getWarningMessage = () => {
        if (checkForEmptyProfileBio() === true && checkForEmptyProfilePic() === true) {
            return 'Your profile will have no bio or profile picture, do you still want to continue?'
        } else if (checkForEmptyProfileBio() === true) {
            return 'Your profile will have no bio, do you still want to continue?'
        } else if (checkForEmptyProfilePic() === true) {
            return 'Your profile will have no profile pic, do you still want to continue?'
        }
    }

    return (
        <div className='overlay'>
            <div className='empty-form-warning'>
                <div className='modal-title'>Warning!</div>
                <div className='warning-message'>{getWarningMessage()}</div>
                <div className="warning-buttons-container">
                    <button className='warning-btn' id='confirm-submit-profile' onClick={(e) => handleSubmit(e)}>YES</button>
                    <div className='warning-btn' id='cancel-submit-profile' onClick={() => setEmptyFormWarning(false)}>NO</div>
                </div>
            </div>
        </div>
    )

}