const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("THIS IS THE EVENTS ROUTE INDEX PAGE")
})


module.exports = router