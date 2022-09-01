import React from 'react'
import cx from 'classnames'
import styles from './Page.styl'

interface PageProps {
  children: React.ReactNode
  narrow?: boolean
  className?: string
}

const Page = ({ children, narrow, className }: PageProps): JSX.Element => (
  <div
    className={cx(className ?? 'u-mv-2 u-mh-2 u-pb-3', {
      [styles['Page--narrow']]: narrow
    })}
  >
    {children}
  </div>
)

export default Page
