const { expect } = require('chai')
const path = require('path')
const directoryWalker = require('../directory-walker')

describe('directory-walker', () => {
    
    let callbacks = []
    let root = path.join(__dirname, 'test-dir')

    it('should walk the director reporting the files encounterd', () => {

        directoryWalker(root, cb => {
            callbacks.push(cb)
        })

    })

    it('should have the correct structure', () => {

        expect(callbacks[0]).to.eql({
            root, relative: [], code_files: [], config: {}
        })

        expect(callbacks[1]).to.eql({
            root, relative: ['a'], config: undefined, 
            code_files: [{
                filename: 'a.py',
                filetype: 'python',
                path: path.join(root, 'a', 'a.py')
            }], 
        })

        expect(callbacks[2]).to.eql({
            root, relative: ['a','b'], config: undefined, 
            code_files: [
                {
                    filename: 'b.js',
                    filetype: 'javascript',
                    path: path.join(root, 'a','b', 'b.js')
                },
                {
                    filename: 'b.md',
                    filetype: 'markdown',
                    path: path.join(root, 'a','b', 'b.md')
                },
                {
                    filename: 'b.py',
                    filetype: 'python',
                    path: path.join(root, 'a','b', 'b.py')
                },
                {
                    filename: 'b.r',
                    filetype: 'r',
                    path: path.join(root, 'a','b', 'b.r')
                }
            ],
        })

        expect(callbacks[3]).to.eql({
            root, relative: ['a','b','c'], config: { "a": ["b","c"] }, 
            code_files: [
                {
                    filename: 'c1.py',
                    filetype: 'python',
                    path: path.join(root, 'a','b','c', 'c1.py')
                },
                {
                    filename: 'c2.py',
                    filetype: 'python',
                    path: path.join(root, 'a','b','c', 'c2.py')
                },
            ],
        })

        expect(callbacks[4]).to.eql({
            root, relative: ['x'], config: undefined, 
            code_files: [],
        })

        expect(callbacks[5]).to.eql({
            root, relative: ['x','y'], config: { "x": "y" }, 
            code_files: [],
        })

        expect(callbacks[6]).to.eql({
            root, relative: ['x','z'], config: { "x": "z" }, 
            code_files: [],
        })

        expect(callbacks).to.have.lengthOf(7)
    })
})