const path = require('path')
const fs = require('fs')
const generateDocfile = require('./generate-docfile')
const outputCompiler = require('./output-compiler')


module.exports = function(input_folder, output_folder){
    if(!input_folder){
        console.error(`input_folder cannot be undefined`)
        process.exit(1) 
    } 
    
    try {
        const full_path = path.join(process.cwd(), input_folder)
        const full_output = path.join(process.cwd(), output_folder)
        if(!fs.existsSync(full_path)){
            console.error(`cannot find input_folder ${full_path}`)
            process.exit(1)
        }

        const doc_file = generateDocfile(full_path)
        outputCompiler(doc_file, output_folder)
    } catch(me){
        console.log(me)
        console.error(`unable to load config`)
        process.exit(1)
    }

    process.exit(0)
}