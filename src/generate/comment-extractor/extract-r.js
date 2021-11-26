module.exports = text => {

    const lines = text.split('\r\n')
    let comments = []
    let current_comment;
    for(let line of lines){
        let l = line.trim()
        if(l.startsWith("#'")){
            const cl = l.replace("#'", '').trim()
            if(current_comment){
                current_comment.push(cl)
            } else {
                current_comment = [cl]
            }
        } else {
            if(current_comment){
                comments.push(current_comment.join('\r\n'))
                current_comment = null
            } 
        }
    }

    if(current_comment){
        comments.push(current_comment.join('\r\n'))
    }

    return comments

}
