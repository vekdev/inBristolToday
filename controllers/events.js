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
        // console.log(req.body)
        // const myDate = new Date("2024-07-02T09:30:00")
        // const ukTime = new Intl.DateTimeFormat("en-GB", { timezone: "Europe/London", timeZoneName: "longOffset" }).format(myDate)
        // const gmtOffset = ukTime.split("GMT")[1]


        const tzname = "Europe/London"
        const longOffsetFormatter = new Intl.DateTimeFormat("en-GB", { timeZone: tzname, timeZoneName: "longOffset" })
        const longOffsetString = longOffsetFormatter.format(new Date("2024-07-02T09:30:00"))
        const gmtOffset = longOffsetString.split('GMT')[1]

        const getDate = () => {
            return gmtOffset !== "" ? "2024-07-02T09:30:00" + gmtOffset : "2024-07-02T09:30:00+00:00"
        }

        const newDate = new Date(getDate())
        // const finalDate = new Date(getDate())
        console.log(`GMT OFFSET = ${gmtOffset}`)



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