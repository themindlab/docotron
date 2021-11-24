const regular_expression = /([a-zA-Z_])*::/g

const parse = text => {

    const matches = text.matchAll(regular_expression)

    let indexes = []
    for(let m of matches){
        indexes.push(m.index)
    }

    let statements = []
    if(indexes.length === 0){
        return
    } else if(indexes.length === 1){
        statements = [text]
    } else {
        for(let i=0 ; i<indexes.length-1 ; i++){
            statements.push(text.substring(indexes[i], indexes[i+1]).trim())
        }
    }


    const output = {}
    statements = statements.map(st => {
        const parts = st.split('::').map(p => p.trim())
        output[parts[0].toLowerCase()] = parts[1]
    })

    return output
}


module.exports = function(comments,  file_path){
    return {
        file_path,
        entries: comments.map(parse).filter(c => c !== undefined)
    }
}