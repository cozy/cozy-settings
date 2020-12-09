import React from 'react'
import ReactMarkdown from 'react-markdown'

import styles from 'styles/index.styl'

const LinkRenderer = props => (
  <a
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
    className={styles['set-markdown-link']}
  >
    {props.children}
  </a>
)

const reactMarkdownRendererOptions = {
  link: LinkRenderer,
  linkReference: LinkRenderer
}

const ReactMarkdownWrapper = ({ source }) => (
  <ReactMarkdown
    source={source}
    renderers={reactMarkdownRendererOptions}
    escapeHtml={false}
  />
)

export default ReactMarkdownWrapper
