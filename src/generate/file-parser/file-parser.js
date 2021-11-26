const commentExtractor = require("../comment-extractor")
const commentParser = require("../comment-parser")
const consolidateEntries = require("./consolidate-entries")

module.exports = obj => {
    const { filetype, path } = obj

    if(filetype==='markdown'){
        return obj
    }

    const comments = commentExtractor({ filetype, path })
    let entries = comments.map(commentParser)

    entries = consolidateEntries(entries)
    
    return { ...obj, entries }

}