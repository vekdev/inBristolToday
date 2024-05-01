module.exports = {
    showEvents: (req, res) => {
        res.send("THIS WILL SHOW ALL THE EVENTS FOR TODAY IN A NICE EASY TO READ FORMAT!")
    },
    addEvent: (req,res) => {
        res.send("THIS WILL BE THE PATH WHERE A NEW EVENT WILL BE ADDED TO THE DATABASE VIA A FORM. REMEMBER TO ADD CLOUDINARY HERE FOR IMAGE UPLOADS / MANAGEMENT")
    }
}