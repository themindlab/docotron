const { expect } = require('chai')
const parse = require('..')

describe('parse', () => {

    it('should parse', () => {

        expect(parse(`
            This is the description
            @class MyClass
            @superb something else
        `)).to.eql({
            type: 'class',
            name: 'MyClass',
            description: 'This is the description',
            annotations: [
                { 'superb': 'something else'}
            ]
        })

    })

})