const fs = require('fs')
const path = require('path')
const DocFile = require('./DocFile')
const FileEntry = require('./FileEntry')

const isDir = filepath => fs.statSync(filepath).isDirectory()


const getDocFileJson = dir => {
    let doc_file;
    const docfile_path = path.join(dir, '.docotron.json')
    if(fs.existsSync(docfile_path)){
        doc_file = require(docfile_path)
    }
    return doc_file
}

const walk = (dir, doc_file) => {

    const docFileJson = getDocFileJson(dir)
    let current_doc;
    if(!doc_file){
        doc_file = new DocFile(dir, docFileJson)
        current_doc = doc_file
    } else {
        
        if(docFileJson){
            current_doc = new DocFile(dir, docFileJson)
            doc_file.addChild(current_doc)
        } else {
            current_doc = doc_file
        }
    }


    // directory structure
    const files = fs.readdirSync(dir)
    files
        .filter(f => ['.js','.r','.py'].includes())
        .forEach(f => {
            console.log(`adding: ${f}`)
            current_doc.addFile(new FileEntry(f, dir, current_doc))
        })


    files
        .filter(f => isDir(path.join(dir, f)))
        .forEach(subdir => {
            walk(path.join(dir,subdir), current_doc)
        })


    return doc_file
}


module.exports = function(dirname){

    if(!fs.existsSync(dirname) || !isDir(dirname)){
        throw new Error(`invalid directory: ${dirname}`)
    }

    return walk(dirname)
}

