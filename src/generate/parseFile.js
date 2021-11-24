const fs = require('fs')
const path = require('path')
const groupClasses = require('./groupClasses')
const js_reg_exp = /\*([\s\S]*?)\*/g
const py_reg_exp = /\"\"\"([\s\S]*?)\"\"\"/g

const parseComments = require('./parseComments')

module.exports = function(file_path){

    const filetype = path.extname(file_path).toLowerCase()
    const text = fs.readFileSync(file_path).toString()
    let matches;
    switch(filetype){
        case '.js':
            matches = text.matchAll(js_reg_exp)
            break;
        case '.py':
            matches = text.matchAll(py_reg_exp)
            break
        default:
            console.log(`skipping unsupported file: ${file_path}`)
            return
    }
    let comments = []
    for(let m of matches){
        comments.push(m[1])
    }

    let doc_entries = parseComments(comments, file_path)
    doc_entries = groupClasses(doc_entries)
    
    return doc_entries
    
}