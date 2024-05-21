const events = require("../models/Events")
const textFormatter = require("../models/TextToHTML")
const timeFormat = require("../models/DateForDisplay")
// const cloudinary = require("cloudinary").v2
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

        
        console.log(req.file.path)

        const result = await cloudinary.uploader.upload(req.file.path)

        console.log(result)

        // const uploadImage = async (imagePath) => {

        //     // Use the uploaded file's name as the asset's public ID and 
        //     // allow overwriting the asset with new versions
        //     const options = {
        //         use_filename: true,
        //         unique_filename: false,
        //         overwrite: true,
        //     };

        //     try {
        //         // Upload the image
        //         const result = await cloudinary.uploader.upload(imagePath, options);
        //         console.log(result);
        //         return result.public_id;
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }

        // uploadImage(req.file.path)

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
        await events.create({
            title: req.body.title,
            description: textToHTML,
            date: ukDateAndTime
        })
        res.redirect("/events")
    },
    purge: async (req, res) => {
        // Eventually this will need to purge only those events that have already taken place (with dates in the past. For now, it just empties the collection completely - Use with caution!! There is zero prote4ction for this at the moment!!)
        const todaysDate = new Date(Date.now())
        await events.deleteMany({ date: { $lt: todaysDate } })
        res.redirect("/events")
    },
    showSingleEvent: async (req, res) => {
        const event = await events.findOne({ _id: req.params.id })
        const eventTimeInUK = timeFormat(event.date)
        res.render("single-event.ejs", {
            event: event,
            date: eventTimeInUK
        })
    }
}