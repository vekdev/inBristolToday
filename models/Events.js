const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String,
    image: {
        url: String,
        id: String,
        ext: String
    },
    // image_url: String
})

module.exports = mongoose.model("event", eventSchema)