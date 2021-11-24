module.exports = function(parsed){

    let new_entries = []
    let current_class;

    const { entries } = parsed

    entries.forEach(et => {
        if(et.docotron==='class'){
            current_class = { class: et, methods: [], static_methods: [] }
        } else if(et.docotron==='constructor'){
            current_class.constructor = et
        } else if (et.docotron==='classmethod'){
            current_class.methods.push(et)
        } else if (et.docotron==='staticmethod'){
            current_class.static_methods.push(et)
        } else {
            if(current_class){
                console.log(current_class)
                new_entries.push(current_class)
                current_class = null
            } 
            new_entries.push(et)
        }

    })
    if(current_class){ new_entries.push(current_class) }

    parsed.entries = new_entries

    return parsed
}