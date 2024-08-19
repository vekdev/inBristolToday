const events = require("../models/Events")
const textFormatter = require("../models/TextToHTML")
const timeFormat = require("../models/DateForDisplay")
const cloudinary = require("../middleware/cloudinary")


module.exports = {
    showEvents: async (req, res) => {
        const todaysDate = new Date(Date.now())
        const twentyFourHoursFromNow = new Date(Date.now() + 60 * 60 * 24 * 1000)
        const allEventsNextTwentyFourHours = await events.find({ date: { $gte: todaysDate, $lt: twentyFourHoursFromNow } }).sort({ date: 1 })

        res.render("events.ejs", {
            events: allEventsNextTwentyFourHours,
            dateString: todaysDate.toLocaleDateString("en-GB", { timeZone: "Europe/London" })
        })
    },
    addEvent: async (req, res) => {

        // PLACE IN A TRY / CATCH BLOCK
        // OPTIONS CAN BE PASSED VIA AN OBJECT AFTER THE IMAGE PATH

        const result = req.file ? await cloudinary.uploader.upload(req.file.path) : ""

        const textToHTML = textFormatter(req.body.description)

        const enteredTime = new Date(`${req.body.date}T${req.body.time}`)
        const longOffsetFormatter = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Europe/London",
            timeZoneName: "longOffset"
        })
            .format(enteredTime)
        const gmtOffset = longOffsetFormatter.split('GMT')[1]

        const checkForBST = () => {
            return gmtOffset !== "" ? enteredTime + gmtOffset : enteredTime + "+00:00"
        }
        const ukDateAndTime = new Date(checkForBST())

        await events.create({
            title: req.body.title,
            description: textToHTML,
            date: ukDateAndTime,
            image: {
                url: result.secure_url,
                id: result.public_id,
                ext: result.format
            }
        })
        res.redirect("/events")
    },
    purge: async (req, res) => {
        const todaysDate = new Date(Date.now())
        const allEvents = await events.find({date: {$lt: todaysDate}})
        allEvents.forEach(async (event) => {
            event.image.id ? await cloudinary.uploader.destroy(event.image.id):console.log("NO IMAGE")
            await events.deleteOne({_id: event.id})
        })
            
    res.redirect("/events")
},
    showSingleEvent: async (req, res) => {
        const event = await events.findOne({ _id: req.params.id })
        const eventTimeInUK = timeFormat(event.date)

        // ADD THIS TO A FUNCTION IN MIDDLEWARE TO ALLOW IT TO RETURN THE FORMATTED URL BASED ON PARAMETERS (SIZE/SCALING/IMAGE FORMAT ETC)
        const optimisedImageUrl = "https://res.cloudinary.com/doowiss1n/image/upload/c_scale,w_800/" + event.image.id + ".webp"

        res.render("single-event.ejs", {
            event: event,
            date: eventTimeInUK,
            optimisedImage: optimisedImageUrl
        })
    }
}