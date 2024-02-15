const express = require("express")
const app = express()
const {json, urlencoded} = require("express")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")

const homeRoutes = require("./routes/home")

app.use(json())
app.use(urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static("public"))
require("dotenv").config({path: "./config/.env"})

const PORT = process.env.PORT

app.use("/", homeRoutes)









app.listen(PORT, () => {
    console.log("Server running")
})