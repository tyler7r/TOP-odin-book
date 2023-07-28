import isSameWeek from 'date-fns/isSameISOWeek';

export const formatDate = (date) => {
    const formatted = new Date(date);
    const today = new Date();
    // posted today
    if (formatted.toDateString() === today.toDateString()) {
        let todayOptions = {
            hour: 'numeric', minute: 'numeric'
        }
        return formatted.toLocaleTimeString('en-us', todayOptions)
    }
    // posted in same week
    if (isSameWeek(today, formatted) === true) {
        let sameWeekOptions = {
            weekday: 'short'
        }
        return formatted.toLocaleString('en-us', sameWeekOptions)
    } 
    // posted in the same calendar year
    if (formatted.getFullYear() === today.getFullYear()) {
        let sameYearOptions = {
            month: 'short', day: 'numeric'
        }
        return formatted.toLocaleString('en-us', sameYearOptions)
    }
    // posted outside current calendar year
    let options = {
        year: 'numeric', month: 'short', day: 'numeric'
    }
    return formatted.toLocaleString('en-us', options);
}