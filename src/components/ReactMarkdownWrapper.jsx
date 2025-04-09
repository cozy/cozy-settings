import React from 'react'
import ReactMarkdown from 'react-markdown'

import Typography from 'cozy-ui/transpiled/react/Typography'

import styles from '@/styles/index.styl'

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

const ParagraphRenderer = ({ children }) => {
  return (
    <Typography variant="body1" className="u-mv-half">
      {children}
    </Typography>
  )
}

const reactMarkdownRendererOptions = {
  link: LinkRenderer,
  linkReference: LinkRenderer,
  paragraph: ParagraphRenderer
}

const ReactMarkdownWrapper = ({ source }) => (
  <ReactMarkdown
    source={source}
    renderers={reactMarkdownRendererOptions}
    escapeHtml={false}
  />
)

export default ReactMarkdownWrapper
