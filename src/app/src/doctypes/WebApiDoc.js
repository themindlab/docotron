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

    const { service, description, methods, api_root } = content

return <div className='classdoc'>
        <h3>{ service }  <pre>{ api_root }</pre></h3>
        <p>{ description} </p>
        <hr/>
        { methods.map(m => {

            return <>
                <h4><pre>{ m.url }</pre></h4>
                <p>{ m.description }</p>
                <ArgTable
                    args = { m.params } 
                />
                <p>Returns: {m.returns }</p>

            </>

        })}

    </div>

}