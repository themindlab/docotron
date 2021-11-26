
/**
 * Simply returns the entire body as a description `{ desciption: body }`
 * @function parseUnknown(body)
 * @returns {obj}
 */
const parseUnknown = body => ({ description: body })


/**
 * Splits the body into `{ name, description }`
 * where `name` is the text up to the first space
 * and `description` is everything else
 * 
 * @function parseNamedItem(body)
 * @param {str} body 
 * @returns {obj}
 */
const parseNamedItem = body => {
    const parts = body.split(' ')
    return { 
        name: parts.shift(), 
        description: parts.join(' ').trim() 
    }
}

// Alises
const parseClass = parseNamedItem
const parseFunction = parseNamedItem
const parseMethod = parseNamedItem
const parseStaticMethod = parseNamedItem

/**
 * Handles parsing types e.g. {str} or {(str|object)}
 * @function
 */

const type_regexp = /^{([a-zA-Z_|\(\)]+)}/
const multi_type_regexp = /^\(([a-zA-Z_|]+)\)/

const parseType = str => {
    let type = str.match(type_regexp)[1];
    // deal with conditional types where for example we have {(str, object)}
    if(multi_type_regexp.test(type)){
        type = type.match(multi_type_regexp)[1].split('|')
    }
    return type
}


const parseParam = body => {
    let { name, description } = parseNamedItem(body)
    
    let type; 
    /*
        if the description (text on RHS) starts with {blah}
        then we assign the content between the braces to
        type
    */
    if(type_regexp.test(name)){
        type = parseType(name);
        ({ name, description } = parseNamedItem(description))
    }

    return { name, description, type }

}


const parseReturn = description => {
    let type;
    if(type_regexp.test(description)){
        type = parseType(description);

        ([_, ...description] = description.split(' '))
        description = description.join(' ')
    }

    description = description.trim()

    return { description, type }
}


const parsers = {
    'class'             : parseClass,
    'function'          : parseFunction,
    'method'            : parseMethod,
    'staticmethod'      : parseStaticMethod,
    'param'             : parseParam,
    'return'            : parseReturn
}


/**
 * Takes an array of two strings, the annotation and the subsequent text
 * which we call the 'body' and applies the appropriate parser to the body
 * for the annotation.
 * 
 * @function parseBody(text_entry)
 * @param {arr} text_entry where the first string is the annotation 
 * and the second is text that follows (body)
 * @returns {arr} The annotation and the 'body'
 */
const parseBody = (text_entry) => {

    let [ name, body ] = text_entry
    name = name.slice(1)
    const parser = parsers[name] || parseUnknown
    return [name, parser(body)]
    
}


/**
 * 
 * @function parseAnnotations(text_annotations)
 */
const parseAnnotations = text_annotations => {
    return text_annotations.map(parseBody)
}


module.exports = {
    parseClass,
    parseFunction,
    parseMethod,
    parseStaticMethod,
    parseParam,
    parseReturn,
    parseUnknown,

    parseAnnotations
}

