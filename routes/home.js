const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("NEW FILE")
})




module.exports = router