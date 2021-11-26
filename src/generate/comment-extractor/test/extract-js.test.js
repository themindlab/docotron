const { expect } = require('chai')
const path = require('path')
const extractJS = require('../extract-js')
const { loadText } = require('../utils')

describe('comment-extractor/extract js', () => {


    it('should grab all the comments', () => {

        const text = loadText(path.join(__dirname, 'test-files', 'testfile-1.js'))
        const comments = extractJS(text)
        expect(comments).to.eql([1,2,3,4,5].map(i => `comment_${i}\r\ncontent`))

    })

})