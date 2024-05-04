const events = require("../models/Events")

module.exports = {
    showEvents: async (req, res) => {
        const allEvents = await events.find()
        const eventIds = [];
        allEvents.forEach(e => {
            eventIds.push(e.date.toTimeString())
        })
        res.send(eventIds)
    },
    addEvent: async (req, res) => {
        const myTime = new Date(`${req.body.date}T${req.body.time}`)
        const longOffsetFormatter = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", timeZoneName: "longOffset" }).format(myTime)
        const gmtOffset = longOffsetFormatter.split('GMT')[1]
        // THIS FUNCTION QUICKLY CHECKS FOR BST OR GMT AND ADDS RELEVANT INFO TO THE TIME 
        const getDate = () => {
            return gmtOffset !== "" ? myTime + gmtOffset : myTime + "+00:00"
        }
        const newDate = new Date(getDate())
        await events.create({
            title: req.body.title,
            description: req.body.description,
            date: newDate
        })
        res.redirect("/events")
    },
    purge: async (req, res) => {
        // Eventually this will need to purge only those events that have already taken place (with dates in the past. For now, it just empties the collection completely - Use with caution!!)
        await events.deleteMany()
        res.redirect("/events")
    }
}