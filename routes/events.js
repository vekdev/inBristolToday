const express = require("express")
const router = express.Router()
const eventsController = require("../controllers/events")

router.get("/", eventsController.showEvents)
router.get("/add", eventsController.addEvent)


module.exports = router