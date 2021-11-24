import React from 'react'
import './classdoc.scss'

const ArgTable = ({args}) => {

    return <table className='argtable'>
        <tr className='header'>
            <th>name</th>
            <th>type</th>
            <th>description</th>
        </tr>
        { 
            args.map((arg, idx) => <tr key={`${idx}`}>
                <td><pre>{ arg.name }</pre></td>
                <td><pre>{ arg.type }</pre></td>
                <td>{ arg.description }</td>
            </tr>)
        }
    </table>


}



export default ({ content }) => {

    const { classname, description, methods, constructor} = content

    return <div className='classdoc'>
        <h3>{ classname }</h3>
        <p>{ description} </p>
        <hr/>
        <h4>Constructor</h4>
        <pre className='syntax'>{ constructor.syntax }</pre>
        <ArgTable
            args = { constructor.args }
        />

        <hr/>
        <h4>Methods</h4>
        { methods.map(m => {

            return <>
                <pre className='syntax'>{ m.syntax } <span className='output'>&#8594; { m.return } </span></pre>
                <p>{ m.description }</p>
                <ArgTable
                    args = { m.args }
                />

            </>

        })}

    </div>

}