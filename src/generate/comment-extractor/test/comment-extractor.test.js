const { expect } = require('chai')
const path = require('path')
const commentExtractor = require('../comment-extractor')

describe('comment-extractor/comment-extractor', () => {


    const test_files = [
        ['testfile-1.py', 'python'],
        ['testfile-1.js', 'javascript'],
        ['testfile-1.r', 'r']
    ]
    
    test_files.forEach(([filename, filetype]) => {

        it(`should extract from ${filename}`, () => {

            const filepath = path.join(__dirname, 'test-files', filename)
            const comments = commentExtractor({ filetype, path: filepath })

            expect(comments).to.be.instanceOf(Array)
            expect(comments.length > 0).to.be.true

        })

    })

})