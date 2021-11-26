const { expect } = require('chai')
const path = require('path')
const generator = require('../generator')

describe('generator', () => {

    it('should work', () => {

        const dirpath = path.join(__dirname, 'test-folder')

        const doc = generator(dirpath)

        // TODO: write tests
    })


})