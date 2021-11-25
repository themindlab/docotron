const path = require('path')
const buildDoc = require('../generate/buildDoc')
describe('test filewalker', () => {


    let doc;
    it('should traverse the files gathering .docotron files and code files', () => {

        const root_dir = path.join(__dirname, 'test-folder')
        doc = buildDoc(root_dir)
        const json = doc.serialise()
        const str = JSON.stringify(json, null, 2)
        console.log(str)

    })

})