const { expect } = require('chai')
const path = require('path')
const outputCompiler = require('../../output-compiler/output-compiler')
const generator = require('../generator')

describe('generator', () => {

    it('should work', () => {

        const dirpath = path.join(__dirname, 'test-folder')

        const doc = generator(dirpath)

        const output_folder = path.join(__dirname, 'output-test')
        outputCompiler(doc, output_folder)
        // TODO: write tests
    })


})