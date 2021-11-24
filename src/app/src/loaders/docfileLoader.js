import docfilelist from '../../dist/docfile-list'

export default function(key){
    const dataURI = docfilelist[key]
    return dataURI
}