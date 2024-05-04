const express = require("express")
const router = express.Router()
const eventsController = require("../controllers/events")

router.get("/", eventsController.showEvents)
router.post("/add", eventsController.addEvent)
router.get("/purge", eventsController.purge)


module.exports = router