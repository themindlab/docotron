import React from 'react'
import ClassDoc from './doctypes/ClassDoc'
import WebApiDoc from './doctypes/WebApiDoc'

export default ({ content }) => {

    const { doc_type } = content

    if(doc_type === 'class'){
        return <ClassDoc content={content} />
    }

    if(doc_type === 'webapi'){
        return <WebApiDoc content={content} />
    }

    return <div>
        <h3>Unsupported doc type: { doc_type }</h3>
        <pre>{ JSON.stringify(content, null, 2) }</pre>
    </div>

}