/**
 *  Formatting date time to a readable format
 *  Example: Tuesday, August 4, 2020, 7:18 AM
 *
 * @param dateTime
 * @returns {string}
 */
export const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    return date.toLocaleDateString("en-US", options);
};
