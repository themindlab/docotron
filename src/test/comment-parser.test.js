const DocItem = require('../generate/DocItem')

describe('comment parsing' , () => {

    describe('class comments', () => {

        let doc_item
        it('should parse a comment', () => {
            const c = `
                This class handles interesting stuff
                @class MyClass
                @param {Object} emplyees the employees
                @param {String} another this is another parameter
            `

            doc_item = new DocItem(c)

        })

        it('should allow children to be appended', () => {
            const c = `
                Thus is a class method
                @method handeAction          
                @random_annot sduper
            `
            // const child_item = new DocItem(c)
            // doc_item.addChild(child_item)
        })

        it('should serialise', () => {
            const output = doc_item.serialise()            
        })
    })



    describe('function comments', () => {


    })


})