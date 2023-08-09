export const isProfilePicAvailable = (item) => {
    if ((item.profilePic !== undefined) && (item.profilePic !== '')) {
        return true;
    } else {
        return false;
    }
}