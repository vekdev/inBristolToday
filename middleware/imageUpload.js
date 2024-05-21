module.exports = (req, res, next) => {
    console.log("REACHED MIDDLEWARE: THIS IS WHERE I WILL HANDLE THE IMAGE UPLOAD")
    next()
}