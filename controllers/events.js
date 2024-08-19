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

        const myTime = new Date(`${req.body.date}T${req.body.time}`)
        const longOffsetFormatter = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Europe/London",
            timeZoneName: "longOffset"
        })
            .format(myTime)
        const gmtOffset = longOffsetFormatter.split('GMT')[1]

        const checkForBST = () => {
            return gmtOffset !== "" ? myTime + gmtOffset : myTime + "+00:00"
        }
        const ukDateAndTime = new Date(checkForBST())

        // const optimisedImage = cloudinary.image(req.file.path, {width: 400, crop: "scale"})


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
        // Eventually this will need to purge only those events that have already taken place (with dates in the past. For now, it just empties the collection completely - Use with caution!! There is zero prote4ction for this at the moment!!)
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
        const optimisedImageUrl = "https://res.cloudinary.com/doowiss1n/image/upload/c_scale,w_800/" + event.image.id + ".webp"

        res.render("single-event.ejs", {
            event: event,
            date: eventTimeInUK,
            optimisedImage: optimisedImageUrl
        })
    }
}