const DocFile = require('../generate/DocFile')
const { expect } = require('chai')

describe('docfile', () => {

    let df;
    it('should work', () => {

        df = new DocFile('path/to/.docfile.json', {
            menu: [
                {
                    title: 'overview',
                    type: 'markdown',
                    path: './overview.md'
                },
                {
                    title: 'usage',
                    type: 'markdown',
                    path: './usage.md'
                }
            ]
        })

    })

    it('should throw for bad format', () => {

        expect(() => new DocFile('path/to/.docfile.json', { a: 'b' })).to.throw

    })

    it('should be able to add files', () => {
        
    })

})