const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String
})

module.exports = mongoose.model("event", eventSchema)