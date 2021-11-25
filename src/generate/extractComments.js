const fs = require('fs')
const path = require('path')
const js_reg_exp = /\/\*\*([\s\S]*?)\*\//g
const py_reg_exp = /\"\"\"([\s\S]*?)\"\"\"/g

const getJsComments = text => {
    let comments = []
    for(let m of text.matchAll(js_reg_exp)){
        const comment = m[1].trim().split('\r\n')
            .map(line => line.replace('*',''))
            .join('\r\n').trim()
        comments.push(comment)
    }

    return comments
}

const getRComments = text => {

    const lines = text.split('\r\n')
    let comments = []
    let current_comment;
    for(let line of lines){
        let l = line.trim()
        if(l.startsWith("#'")){
            const cl = l.replace("#'", '').trim()
            if(current_comment){
                current_comment.push(cl)
            } else {
                current_comment = [cl]
            }
        } else {
            if(current_comment){
                comments.push(current_comment.join('\r\n'))
                current_comment = null
            } 
        }
    }

    return comments

}


const getPyComments = text => {
    let comments = []
    for(let m of text.matchAll(py_reg_exp)){
        comments.push(m[1])
    }
    return comments
}

module.exports = function(file_path){

    const filetype = path.extname(file_path).toLowerCase()
    const text = fs.readFileSync(file_path).toString()
    switch(filetype){
        case '.js':
            return getJsComments(text)
        case '.py':
            return getPyComments(text)
            
        case '.r':
            return getRComments(text)
        default:
            console.log(`skipping unsupported file: ${file_path}`)
            return []
    }
    
    
}