import React from 'react'
import ReactMarkdown from 'react-markdown'

const LinkRenderer = props => (
  <a href={props.href} target="_blank" rel="noopener noreferrer">
    {props.children}
  </a>
)

const reactMarkdownRendererOptions = {
  Link: LinkRenderer
}

const ReactMarkdownWrapper = ({ source }) => (
  <ReactMarkdown source={source} renderers={reactMarkdownRendererOptions} />
)

export default ReactMarkdownWrapper
