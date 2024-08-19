const express = require("express")
const router = express.Router()
const eventsController = require("../controllers/events")
// const cloudinaryUpload = require("../middleware/imageUpload")
const upload = require("../middleware/multer")

router.get("/", eventsController.showEvents)
router.get("/:event-:id", eventsController.showSingleEvent)
router.post("/add", upload.single("img"), eventsController.addEvent)
router.get("/purge", eventsController.purge)


module.exports = router