const walkFiles = require('./walkFiles')
const DocAggregator = require('./DocAggregator')
const parseFile = require('./parseFile')
const fs = require('fs')
const path = require('path')

module.exports = function(config, docdir, outputdir){

    const doc = new DocAggregator()

    const all_entries = []

    walkFiles(docdir, (file_path, stats) => {
        const entries = parseFile(file_path)
        if(entries){
            all_entries.push(entries)
        }
        
    })

    fs.writeFileSync(path.join(outputdir,'docs.json'), JSON.stringify(all_entries, null, 2))

}