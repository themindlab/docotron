const { expect } = require('chai')
const path = require('path')
const extractPython = require('../extract-py')
const { loadText } = require('../utils')

describe('comment-extractor/extract python', () => {


    it('should grab all the comments', () => {

        const text = loadText(path.join(__dirname, 'test-files', 'testfile-1.py'))
        const comments = extractPython(text)
        expect(comments).to.eql([1,2,3,4,5,6].map(i => `comment_${i}\r\ncontent`))

    })

})