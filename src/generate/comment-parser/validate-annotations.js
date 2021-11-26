
const {
    findDuplicates,
    unique,

    findAnnotations,
    findParams,
    getAnnotationType
} = require('./annotations-utils')


const cannot_combine = ['class', 'function','method','staticmethod']

const mixedAnnotations = annotations => {

    const names = annotations.map(a => a[0])
    let count = 0;
    for(let name of names){
        if(cannot_combine.includes(name)){
            count = count+1
        }
        if(count>1){
            return 'cannot combine annotations, class, function, method or staticmethod'
        
        }
    }

}

const singleton_annotations = ['return']

const invalidSingleTons = annotations => {

    for(let annotation_name of singleton_annotations){
        if(findAnnotations(annotations, annotation_name).length > 1){
            return `cannot have multiple annotations of type: @${annotation_name}`
        }
    }

}


const uniqueParams = annotations => {
    const param_names = findParams(annotations)
        .map(a => a[1].name)

    const duplicated = unique(findDuplicates(param_names))
    if(duplicated.length > 0){
        return `duplicated parameter names: ${duplicated.join(',')}`
    }
}



const incompatible_annotations = {
    'class': ['return','param'],
    '_contructor': ['return']
}

const incompatible = annotations => {

    const type = getAnnotationType(annotations)
    let lookup_type = type
    if(type == 'constructor'){
        lookup_type = '_constructor'
    }

    const incompatible = incompatible_annotations[lookup_type]

    if(incompatible){
        for(let ic of incompatible){
            if(findAnnotations(annotations, ic).length > 0){
                return `${type} cannot have @${ic}`
            }
        }
    }

}


module.exports = function(annotations){

    const err = reason => ({
        type: `invalid annotation`,
        reason
    })

    // Check each rule
    const mixed_error = mixedAnnotations(annotations)
    if(mixed_error){ return err(mixed_error) }

    const unique_params_error = uniqueParams(annotations)
    if(unique_params_error){ return err(unique_params_error) }

    const compatible_error = incompatible(annotations)
    if(compatible_error){ return err(compatible_error)}

    const singleton_error = invalidSingleTons(annotations)
    if(singleton_error){ return err(singleton_error)}

}