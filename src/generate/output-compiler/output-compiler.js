const fs = require('fs')
const path = require('path')
const { rimrafSync }  = require('rimraf')

module.exports = (docfile, output_folder) => {

    // delete the output folder
    rimrafSync(output_folder)

    // rewrite markdown files



    const walkMarkdownUUID = d => {


    // step 1. write the doc file
    fs.writeFileSync(
        path.join(output_folder,'DOCOTRON.json'),
        JSON.parse()
        
    )


    // create a dictionary of all the markdown files

    // write the markdown files to a single folder




    // autogenerate the markdown loader

}