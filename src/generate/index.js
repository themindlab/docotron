const path = require('path')
const buildJson = require('./buildJson')
const fs = require('fs')

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
        const config = require(full_path)

        const docotron_dir = path.dirname(full_path)
        buildJson(config, docotron_dir, full_output)

    } catch(me){
        console.log(me)
        console.error(`unable to load config`)
        process.exit(1)
    }

    process.exit(0)
}