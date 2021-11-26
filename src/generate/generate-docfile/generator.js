const fileParser = require('../file-parser')
const dirWalker = require('../directory-walker')
const aggregatePackages = require('./aggregate-packages')
const flattenFiles = require('./flatten-files')
const path = require('path')
module.exports = function(dirpath){

    let dir_objects = []

    dirWalker(dirpath, obj => {
        obj.code_files = obj.code_files.map(fileParser)
        obj.is_package = obj.config !== undefined
        dir_objects.push(obj)
    })


    const pre_doc = aggregatePackages(dir_objects)
    const doc = flattenFiles(pre_doc)

    doc.folder = path.basename(dirpath)

    return doc
    

}