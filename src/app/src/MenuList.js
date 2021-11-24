import React from 'react'

const Header = ({ text }) => <li 
    className='header'>
        {text}
    </li>

const MenuItem = ({ item, onSelect, selected }) => <li
    className={ selected ? 'item selected' : 'item'}>
        <a href='#' onClick={e => {
            e.preventDefault()
            onSelect(item)
        }}>{item.title}</a>
    </li>


const BackButton = ({ onSelect }) => <li
    className='back-button'>
        <a href='#' onClick={e => {
            e.preventDefault()
            onSelect()
        }}>{'Back'}</a>
    </li>


export default ({ menu, onSelect, location, back, selected_item }) => {

    

    return <div className='menu-container'>
        
        <ul className='menu'>
            { 
                (location.length > 1) &&  <BackButton onSelect={back}/>
            }
            { 
                menu.map((mi, idx) => {
                    const key = `${idx}`
                    if(mi.type === 'header'){
                        return <Header key={key} text={mi.title}/>
                    }
                    return <MenuItem 
                        key={key} 
                        item={mi}
                        onSelect={onSelect}
                        selected={selected_item === mi}
                    />
                })
            }
        </ul>
    </div>

}