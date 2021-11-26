module.exports = entries => {

    
    let new_entries = []
    let current_class

    // console.log(this.entries)

    entries.forEach(et => {
        if(et.type==='class'){
            if(current_class){
                new_entries.push(current_class)
            }
            current_class = et
        } else if(et.type ==='constructor') {
            if(!current_class){ throw new Error('constructor without class')}
            current_class.constructor = et
        } else if(et.type ==='staticmethod') {
            if(!current_class){ throw new Error('staticmethod without class')}
            if(!current_class.static_methods){
                current_class.static_methods = []
            }
            current_class.static_methods.push(et)
        } else if(et.type ==='method') {
            if(!current_class){ throw new Error('method without class')}
            if(!current_class.methods){
                current_class.methods = []
            }
            current_class.methods.push(et)
        } else {
            if(current_class){
                new_entries.push(current_class)
                current_class = null
            }
            new_entries.push(et)
        }

    })

    if(current_class){ new_entries.push(current_class) }

    return new_entries

}