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
    },
    purge: async (req, res) => {
        // Eventually this will need to purge only those events that have already taken place (with dates in the past. For now, it just empties the collection completely - Use with caution!!)
        await events.deleteMany()
        res.redirect("/events")
    }
}