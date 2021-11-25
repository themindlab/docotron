const FileEntry = require('../generate/FileEntry')
const path = require('path')
const extractComments = require('../generate/extractComments')
const DocItem = require('../generate/DocItem')


const dir = path.join(__dirname,'test-filewalker')
const f = 'some-functions.js'

describe('FileEntry', () => {


    it('should extract the comments', () => {
        const comments = extractComments(path.join(dir, f))
        // console.log(comments)

    })

    it('should work with a DocItem', () => {
        const it = new DocItem('This is a comment for a class\r\n  @class MyClass')
        // console.log(it)

    })

    it('should work on the javascript', () => {

        const fd = new FileEntry(f, dir, { path: __dirname }) 
        // console.log(fd)
    })
})