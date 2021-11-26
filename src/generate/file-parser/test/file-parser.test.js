const path = require('path')
const fileParser = require('../file-parser')

describe('file-parser/file-parser', () => {

    it('should parse valid files', () => {

        fileParser({ 
            path: path.join(__dirname, 'valid-test-files','testfile1.js'),
            filetype: 'javascript'
        })
    })  

})