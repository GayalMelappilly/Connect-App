
const getCurrentTime = (time) => {
    const timestamp = time
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    const formattedTime = `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
    return formattedTime
}

export default getCurrentTime