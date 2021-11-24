import docfileLoader from './loaders/docfileLoader'

class Explorer {
    constructor(){
        this.location = ['root']
        this.updateDoc()
    }

    currentMenu(){
        return this.docs.menu
    }

    updateDoc(){
        const location = this.location[this.location.length -1]
        this.docs = docfileLoader(location)
        this.selected_item = this.docs.menu.find(m => m.type!=='header')
    }

    select(mi){
        const { src } = mi
        if(src.type==='docfile'){
            this.location.push(src.ref)
            this.updateDoc()
            
            
        } else {
            this.selected_item = mi
        }
    }

    back(){
        this.location.pop()
        this.updateDoc()
    }

    selectedItem(){
        return this.selected_item
    }

    state(){
        return {
            menu: this.currentMenu(),
            selected_item: this.selectedItem(),
            location: this.location
        }
    }
}

export default Explorer