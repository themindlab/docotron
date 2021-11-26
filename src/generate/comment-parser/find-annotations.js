const annotation_regexp = /(@[a-zA-Z0-9_]+)/g

/**
 * Takes a 'naked' comment and parses all the annotations. 
 * 
 * Everything up to the first `"@"` is assigned to `description`
 * following that every subsequent `@<annotaton_name> <text>` is
 * assigned to an `text_entry`, which is an array of the form 
 * `[annotation_name, text]`
 * 
 * @function findAnnotations(comment)
 * @param {str} comment a 'naked' comment.
 * @returns {obj} where the object is of the form `{ description, text_entries: [text_entry] }`
 */
const findAnnotations = comment => {
    let annotation_locs = []
    for(let match of comment.matchAll(annotation_regexp)){
        annotation_locs.push({ 
            annotation: match[0], 
            start: match.index
        })
    } 
    if(annotation_locs.length===0){
        return {
            description: comment.trim()
        }
    }        

    let description = comment.slice(0, annotation_locs[0].start).trim()
    if(description===''){
        description = undefined
    }
    let annotations = { description, text_entries: [] }
    for(let i=0 ; i<annotation_locs.length ; i++){

        const { start, annotation } = annotation_locs[i]

        const end = (i === (annotation_locs.length - 1)) ? comment.length : annotation_locs[i+1].start
        const body = comment.slice(start, end).replace(annotation,'').trim()
        annotations.text_entries.push([annotation, body])
    }
    return annotations
}


module.exports = findAnnotations