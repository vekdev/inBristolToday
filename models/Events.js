const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: String,
    date: {type: Date, default: Date.now()},
    description: String
})

module.exports = mongoose.model("event", eventSchema)