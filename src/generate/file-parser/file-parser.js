const commentExtractor = require("../comment-extractor")
const commentParser = require("../comment-parser")
const consolidateEntries = require("./consolidate-entries")

module.exports = ({ filetype, path }) => {

    const comments = commentExtractor({ filetype, path })
    let entries = comments.map(commentParser)

    entries = consolidateEntries(entries)
    console.log(entries)

    return entries

}