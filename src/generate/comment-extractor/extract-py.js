const { removeWhitespacePadding } = require("./utils")

const py_reg_exp = /\"\"\"([\s\S]*?)\"\"\"/g

module.exports = text => {
    let comments = []
    for(let m of text.matchAll(py_reg_exp)){
        let comment = m[1]
        comment = removeWhitespacePadding(comment)
        comments.push(comment)
    }
    return comments
}