const { getAnnotationType, findAnnotations, findParams } = require("./annotations-utils")



module.exports = annotations => {

    const type = getAnnotationType(annotations)

    let base_annotation = []
    let entry;
    if(!type){
        entry = { type: undefined }
    } else {
        base_annotation = findAnnotations(annotations, type)[0]
        entry = {
            type,
            ...base_annotation[1]
        }
    }


    const params = findParams(annotations)
    if(params.length > 0){ entry.params = params }

    const returns = findAnnotations(annotations, 'return')
    if(returns.length > 0){ entry.returns = returns[0] }

    const handled = [base_annotation]
        .concat(params)
        .concat(returns)

    const others = annotations.filter(a => !handled.includes(a))

    entry.annotations = others.map(o => ({ [o[0]]: o[1].description }))
    return entry
}