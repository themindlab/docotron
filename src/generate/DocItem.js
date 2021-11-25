// https://jsdoc.app/tags-param.html
const doctrine = require('doctrine')

// item types must be a singleton (i.e, not occur more than once)
// and also
const item_types = {

    'class': {
        children: ['method','staticmethod']
    },
    'constructor': {
    },
    'function': {
    },
    'method': {
    },
    'staticmethod': {
    }

}

const valid_types = Object.keys(item_types)

class DocItem {

    constructor(comment){
        this.comment = comment
        this.parsed = doctrine.parse(comment)
        // this.children = []
        this.arrangeTags()
        this.identifyType()
    }

    arrangeTags(){

        let aggregated = {}
        this.parsed.tags.forEach(t => {
            const { title, ...tag } = t
            if(!aggregated[title]){
                aggregated[title] = tag
            } else if (Array.isArray(aggregated[title])){
                aggregated[title].push(tag)
            } else {
                aggregated[title] = [aggregated[title], tag]
            }
        })
        this.aggregated = aggregated
    }

    identifyType(){
        const matching_types = Object
            .keys(this.aggregated)
            .filter(k => valid_types.includes(k))

        if(matching_types.length === 0){
            throw new Error(`cannot identify annotation type. valid type: ${valid_types.map(v => `@${v}`).join(', ')}`)
        } else if(matching_types.length > 1){
            throw new Error(`cannot have multiple annotation types. found: ${matching_types}`)
        } else {
            this.type = matching_types[0]
            this.name = this.aggregated[this.type].name
        }
        delete this.aggregated[this.type]
        
    }

    
    // addChild(doc_item){
    //     const valid_child_types = item_types[this.type].children || []
    //     if(!valid_child_types.includes(doc_item.type)){
    //         throw new Error(`cannot add child of type: ${docitem.type} to parent of type: ${this.type}`)
    //     }
    //     this.children.push(doc_item)
    // }

    serialise(){

        let serialised =  { 
            type: this.type,
            name: this.name,
            description: this.parsed.description, 
            ...this.aggregated
            // children: this.children.map(k => k.serialise())
        }

        if(this.methods){
            serialised.methods = this.methods.map(m => m.serialise())
        }
        if(this.static_methods){
            serialised.static_methods = this.static_methods.map(m => m.serialise())
        }
        if(this._constructor){
            serialised.constructor = this._constructor.serialise()
        }

        return serialised
    }

}


module.exports = DocItem