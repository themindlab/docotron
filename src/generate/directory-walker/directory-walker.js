const fs = require('fs')
const path = require('path')
const isDir = filepath => fs.statSync(filepath).isDirectory()
const exists = filepath => fs.existsSync(filepath)
const buildPath = (root, relative) => path.join(root, ...relative)
const extension = file => path.extname(file).toLowerCase()

const valid_types = {
    '.js': 'javascript',
    '.r': 'r',
    '.py': 'python',
    '.md': 'markdown'
}


const walk = ({ root, relative }, callback) => {

    const current_folder = buildPath(root, relative)
    const files = fs.readdirSync(current_folder)

    const code_files = files
        .filter(f => Object.keys(valid_types).includes(extension(f)))
        .map(f => ({
            filename: f,
            filetype: valid_types[extension(f)],
            path: path.join(current_folder, f)
        })) 
        
    const docotron_path = path.join(current_folder,'.docotron.json')
    let config;
    if(exists(docotron_path)){
        config = require(docotron_path)
    }

    callback({ root, relative, code_files, config })
    files.filter(f => isDir(path.join(current_folder, f))).forEach(dirname => {
        walk({ root, relative: relative.concat([dirname]) }, callback)
    })

}

module.exports = (root , callback)=> {
    walk({ root, relative: [] }, callback)

}