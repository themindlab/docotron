import React from 'react'
import markdownLoader from './loaders/markdownLoader'
import contentLoader from './loaders/contentLoader'
import ReactMarkdown from 'react-markdown'
import ContentViewer from './ContentViewer'

const BreadCrumbs = ({ location }) => <p className='breadcrumbs'>
        { ' / ' + location.slice(1).join(' / ') }
    </p>



export default ({ content, location }) => {

    const { src, title } = content

    return <div className='content-container'>
        <div className='content-title'>
            { (location.length > 1) && <BreadCrumbs location={location} />}
            <h3>{ title }</h3>
        </div>
        <div className='content-main'>
            {
                src.type === 'markdown' && <ReactMarkdown>{ markdownLoader(src.ref) }</ReactMarkdown>
            }
            {
                src.type === 'content' && <ContentViewer
                    content= { contentLoader(src.ref) }
                />
            }
        </div>
        
    </div>

}