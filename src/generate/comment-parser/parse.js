const consolidateAnnotations = require("./consolidate-annotations")
const findAnnotations = require("./find-annotations")
const { parseAnnotations } = require("./parse-annotations")
const validateAnnotations = require("./validate-annotations")

module.exports = function(comment){

    
    const { description, text_entries } = findAnnotations(comment)
    
    if(!text_entries){
        return { description }
    }

    const annotations = parseAnnotations(text_entries)
    
    const err = validateAnnotations(annotations)
    if(err){
        return { ...err, comment }
    }

    const entry = consolidateAnnotations(annotations)
    entry.description = description
    return entry


}