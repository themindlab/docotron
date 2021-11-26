const extractPy = require('./extract-py')
const extractJs = require('./extract-js')
const extractR = require('./extract-r')
const { loadText } = require('./utils')

const extractors = {
    'javascript': extractJs,
    'r': extractR,
    'python': extractPy
}


module.exports = ({ filetype, path }) => {

    const text = loadText(path)
    const extractor = extractors[filetype]

    if(!extractor){
        throw new Error(`invalid filetype: ${filetype}`)
    }

    return extractor(text)

}