const events = require("../models/Events")

module.exports = {
    showEvents: async (req, res) => {
        const allEvents = await events.find()
        const eventIds = [];
        allEvents.forEach(e => {
            eventIds.push(e.id)
        })
        res.send(eventIds)
    },
    addEvent: async (req,res) => {
        await events.create({
            title: "Test Event",
            description: "This is my wonderful description of my event"
        })
        res.redirect("/events")
    }
}