import React from 'react'
import cx from 'classnames'
import styles from './Page.styl'

const Page = ({ children, narrow, className }) => {
  return (
    <div
      className={cx(
        className ?? 'u-mv-2 u-mh-2 u-pb-3',
        narrow && styles['Page--narrow']
      )}
    >
      {children}
    </div>
  )
}

export default Page
