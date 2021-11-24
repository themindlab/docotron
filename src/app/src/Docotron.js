import './style.scss'
import React from 'react'
import ContentContainer from './ContentContainer'
import MenuList from './MenuList'
import Explorer from './Explorer'


class Docotron extends React.Component {

    constructor(){
        super()
        this.state = {}
        this.explorer = new Explorer()
        
    }


    selectItem = (mi) => {
        this.explorer.select(mi)
        this.setState({ selected: mi }) // rerender hack
    }

    back = () => {
        this.explorer.back()
        this.setState({ selected: null })
    }

    render() {

        const { menu, selected_item, location } = this.explorer.state()


        return <div className='app-container'>
            <MenuList 
                menu={menu} 
                location={location}
                onSelect={this.selectItem}
                back={this.back}
                selected_item={selected_item}
            />
            <ContentContainer
                content={selected_item}
                location={location}
            />
        </div>
    
    }
}

export default Docotron