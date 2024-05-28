const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String,
    image_url: String
})

module.exports = mongoose.model("event", eventSchema)