module.exports = time => {
    const formattedTimeString = time.toLocaleTimeString("en-GB", {
        timeZone: "Europe/London",
        hour: "numeric",
        minute: "2-digit",
    })
    return formattedTimeString
}