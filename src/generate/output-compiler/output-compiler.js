const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const uuid = require('uuid')
module.exports = (docfile, output_folder) => {

    // step 1. rewrite markdown files deleting folder and updating refs
    const markdown_folder = path.join(output_folder,'markdown')
    rimraf.sync(markdown_folder)
    fs.mkdirSync(markdown_folder)

    const rewriteMarkdowns = d => {
        d.files = d.files.map(f => {
            if(f.filetype==='markdown'){
                const new_name = `${uuid.v4()}.md`
                fs.copyFileSync(f.path, path.join(markdown_folder, new_name))
                f.ref = new_name
            }

            return f
        })

        d.packages = d.packages.map(rewriteMarkdowns)
        return d
    }

    docfile = rewriteMarkdowns(docfile)

    console.log(docfile)

    // step 2. write the doc file
    fs.writeFileSync(
        path.join(output_folder,'DOCOTRON.json'),
        JSON.stringify(docfile, null, 2)
    )
    
}