import React from 'react'
import markdownLoader from './loaders/markdownLoader'
import contentLoader from './loaders/contentLoader'
import ReactMarkdown from 'react-markdown'
import ContentViewer from './ContentViewer'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you

const MarkdownDoc = ({markdown}) => <ReactMarkdown
    children={markdown}
    remarkPlugins={[remarkMath]}
    rehypePlugins={[rehypeKatex]}
    components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            language={match[1]}
            PreTag="div"
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }}
/>

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
                src.type === 'markdown' && <MarkdownDoc
                    markdown={ markdownLoader(src.ref) }
                />
            }
            {
                src.type === 'content' && <ContentViewer
                    content= { contentLoader(src.ref) }
                />
            }
        </div>
        
    </div>

}