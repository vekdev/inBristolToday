module.exports = {
    homepage: (req, res) => {
        res.render("index.ejs", {
            test: "<h1>This is a header</h1><p>This is a paragraph</p>"
        })
    }


    // FUTURE CODE FOR TURNING ENTERED TEXT INTO VALID HTML BEFORE SAVING IN THE DATABASE

    // let template = req.body.text
    // template = '<p>' + template.replace(/\r\n\r\n/g, '</p><p>')
    // .replace(/\r\n/g, "<br>")
    // .replace("[b]", "<strong>")
    // .replace("[/b]", "</strong>") + '</p>';
    // res.redirect("/admin")
    // console.log(template)
}