export const userInitials = (user) => {
    let firstName = user.first_name;
    let firstInitial = firstName.slice(0, 1)
    let lastName = user.last_name;
    let lastInitial = lastName.slice(0, 1);
    return `${firstInitial}${lastInitial}`;
}