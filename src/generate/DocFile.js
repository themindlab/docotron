const validate = require('jsonschema').validate
const path = require('path')

const schema = {
    type: 'object',
    properties: {
        dir: { type: 'string' },
        markdown: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    path: { type: 'string' }
                }
            }
        }
    }
}    


class DocFile {

  

    constructor(dir, json){
        
        json = json || {}
        json = { 
            // defaults
            markdown: [],  
            // passed data
            ...json, 

            // additional info
            dir, root: path.dirname(dir), folder: path.basename(dir)
        }

        if(!validate(json, schema).valid){
            throw new Error('invalid doc file')
        }

        this.path = dir
        this.doc = json
        this.children = []
        this.files = []
    }

    addChild(docfile){
        if(!(docfile instanceof DocFile)){
            throw new Error(`cannot addChild must be a docfile`)
        }
        this.children.push(docfile)
    }

    addFile(file){
        this.files.push(file)
    }

    serialise(){
        return {
            title: this.doc.title,
            markdown: this.doc.markdown,
            folder: this.doc.folder,
            files: this.files.map(f => f.serialise()),
            children: this.children.map(k => k.serialise())
        }
    }

}

module.exports = DocFile