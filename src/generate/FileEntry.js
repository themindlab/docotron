const extractComments = require('./extractComments')
const DocItem = require('./DocItem')
const path = require('path')

class FileDoc {
    constructor(file, dir, parent){
        
        this.path =  path.join(dir, file)
        this.dir = dir.replace(parent.path+'\\','')
        this.file = file
        this.extension = path.extname(file)
        this.entries = []
        this.errors = []
        this.parse()
    }

    parse(){
        const comments = extractComments(this.path)
        this.comments = comments
        comments.forEach(comment => {

            let doc_item, error;
            try {
                doc_item = new DocItem(comment)
            } catch(me){
                
                error = me
            }
            this.addEntry(doc_item, comment, error)
            
        })

        this.consolidateClasses()

    }

    addEntry(item, comment, error){
        
        if(error){
            this.errors.push({ comment, error })
        } else {
            this.entries.push(item)
        }
    }

    consolidateClasses(){

        let new_entries = []
        let current_class

        // console.log(this.entries)

        this.entries.forEach(et => {
            if(et.type==='class'){
                if(current_class){
                    new_entries.push(current_class)
                }
                current_class = et
            } else if(et.type ==='constructor') {
                if(!current_class){ throw new Error('constructor without class')}
                current_class.constructor = et
            } else if(et.type ==='staticmethod') {
                if(!current_class){ throw new Error('staticmethod without class')}
                if(!current_class.static_methods){
                    current_class.static_methods = []
                }
                current_class.static_methods.push(et)
            } else if(et.type ==='method') {
                if(!current_class){ throw new Error('method without class')}
                if(!current_class.methods){
                    current_class.methods = []
                }
                current_class.methods.push(et)
            } else {
                if(current_class){
                    new_entries.push(current_class)
                    current_class = null
                }
                new_entries.push(et)
            }

        })

        

        if(current_class){ new_entries.push(current_class) }

        this.entries = new_entries
    }

    serialise(){
        return {
            file: this.file,
            dir: this.dir,
            filetype: {
                '.js': 'javascript',
                '.py': 'python',
                '.r': 'r'
            }[this.extension],
            entries: this.entries.map(et => et.serialise()),
            errors: this.errors.map(e => ({
                comment: e.comment,
                error: e.error.toString()
            }))
        }
    }

}

module.exports = FileDoc