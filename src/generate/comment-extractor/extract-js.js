const { removeWhitespacePadding } = require("./utils")

const js_reg_exp = /\/\*\*([\s\S]*?)\*\//g

module.exports = text => {
    let comments = []
    for(let m of text.matchAll(js_reg_exp)){
        let comment = m[1].trim().split('\r\n')
            .map(line => line.replace('*',''))
            .join('\r\n').trim()

        comment = removeWhitespacePadding(comment)
        comments.push(comment)
    }

    return comments
}
