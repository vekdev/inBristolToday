module.exports = (text) => {
        text = '<p>' + text.replace(/\r\n\r\n/g, '</p><p>')
            .replace(/\r\n/g, "<br>")
            .replace("[b]", "<strong>")
            .replace("[/b]", "</strong>") + '</p>'
        return text
    }
