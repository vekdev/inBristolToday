const events = require("../models/Events")
const textFormatter = require("../models/TextToHTML")

module.exports = {
    // THIS CONTROLLER WILL EVENTUALLY RENDER THE EJS PAGE THAT SHOWS THE EVENTS THAT ARE HAPPENING TODAY
    // CURRENTLY IT'S JUST PRINTING AN ARRAY OF ANY EVENTS TO THE SCREEN
    showEvents: async (req, res) => {
        const allEvents = await events.find()
        const eventIds = [];
        const todaysDateUkFormat = new Date(Date.now()).toLocaleDateString("en-GB")
        // allEvents.forEach(e => {
        //     if (e.date.toLocaleDateString("en-GB") !== todaysDateUkFormat) return
        //     eventIds.push(e.title + " " + e.date.toLocaleTimeString("en-GB", {
        //         timeZone: "Europe/London", 
        //         hour: "2-digit", 
        //         minute: "2-digit" }) + e.description)
        // })




        // Remember to use <%- ... %> for non-eacaping HTML when using the description from db so that html is used and not a string
        // res.send(eventIds)
        res.render("events.ejs", {
            events: allEvents
        })
    },
    addEvent: async (req, res) => {

        const textToHTML = textFormatter(req.body.description)

        const myTime = new Date(`${req.body.date}T${req.body.time}`)
        const longOffsetFormatter = new Intl.DateTimeFormat("en-GB", { 
            timeZone: "Europe/London", 
            timeZoneName: "longOffset" })
            .format(myTime)
        const gmtOffset = longOffsetFormatter.split('GMT')[1]
        
        const checkForBST = () => {
            return gmtOffset !== "" ? myTime + gmtOffset : myTime + "+00:00"
        }
        const ukDateAndTime = new Date(checkForBST())
        await events.create({
            title: req.body.title,
            description: textToHTML,
            date: ukDateAndTime
        })
        res.redirect("/events")
    },
    purge: async (req, res) => {
        // Eventually this will need to purge only those events that have already taken place (with dates in the past. For now, it just empties the collection completely - Use with caution!!)
        await events.deleteMany()
        res.redirect("/events")
    },
    showSingleEvent: async (req, res) => {
        const event = await events.findOne({_id: req.params.id})
        const eventTimeInUK = event.date.toLocaleTimeString("en-GB", {
            timeZone: "Europe/London",
            hour: "numeric",
            minute: "2-digit"
        })
        res.render("single-event.ejs", {
            event: event,
            date: eventTimeInUK
        })
    }
}