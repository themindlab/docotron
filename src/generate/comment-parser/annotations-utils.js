
const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
const unique = arr => [...new Set(arr)]

const findAnnotations = (annotations, name) => annotations.filter(a => a[0] === name)

const findParams = annotations => findAnnotations(annotations, 'param')

const types = ['class','method','function','staticmethod','constructor']

const getAnnotationType = annotations => {
    for(let t of types){
        if(findAnnotations(annotations, t).length > 0){
            return t
        }
    }
    
}
module.exports ={
    findDuplicates,
    unique,

    findAnnotations,
    findParams,
    getAnnotationType
}