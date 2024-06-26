const express = require("express")
const app = express()
const {json, urlencoded} = require("express")
const {connectDB} = require("./config/db")

/* 
FUTURE PACKAGE REQUIREMENTS FOR WHEN ACCOUNTS ENABLED FOR EVENT ADDING.

const session = require("express-session")
const passport = require("passport")
const MongoStore = require("connect-mongo")
*/

require("dotenv").config({path: "./config/.env"})

const homeRoutes = require("./routes/home")
const eventRoutes = require("./routes/events")

// CONNECT TO DATABASE

connectDB()

app.use(json())
app.use(urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static("public"))

const PORT = process.env.PORT

// ROUTES

app.use("/", homeRoutes)
app.use("/events/", eventRoutes)




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})