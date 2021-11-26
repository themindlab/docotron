const path = require('path')
const fs = require('fs')
const buildDoc = require('./buildDoc')

module.exports = function(config_path, output_path){
    if(!config_path){
        console.error(`config path cannot be undefined`)
        process.exit(1) 
    } 
    
    try {
        const full_path = path.join(process.cwd(), config_path)
        const full_output = path.join(process.cwd(), output_path)
        if(!fs.existsSync(full_path)){
            console.error(`cannot find config: ${full_path}`)
            process.exit(1)
        }
        // const config = require(full_path)

        const docotron_dir = path.dirname(full_path)

        const Docfile = buildDoc(docotron_dir)

        fs.writeFileSync(full_output, Docfile.serialise())

    } catch(me){
        console.log(me)
        console.error(`unable to load config`)
        process.exit(1)
    }

    process.exit(0)
}