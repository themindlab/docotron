const { expect } = require('chai')
const path = require('path')
const extractR = require('../extract-r')
const { loadText } = require('../utils')

describe('comment-extractor/extract R', () => {


    it('should grab all the comments', () => {

        const text = loadText(path.join(__dirname, 'test-files', 'testfile-1.r'))
        const comments = extractR(text)
        expect(comments).to.eql([1,2,3,4].map(i => `comment_${i}\r\ncontent`))

    })

})