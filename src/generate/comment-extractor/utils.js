const fs = require('fs')

const removeWhitespacePadding = text => {

    const newline = `\r\n`

    text = text.trim()

    return text
        .split(newline)
        .map(line => line.trim())
        .join(newline)

}

module.exports = {
    loadText:  file_path => fs.readFileSync(file_path).toString(),
    removeWhitespacePadding
}