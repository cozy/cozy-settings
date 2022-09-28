import React from 'react'
import cx from 'classnames'
import styles from './Page.styl'

interface PageProps {
  children: React.ReactNode
  narrow?: boolean
  withoutMarginTop?: boolean
  className?: string
}

const Page = ({
  children,
  narrow,
  withoutMarginTop,
  className
}: PageProps): JSX.Element => (
  <div
    className={cx(className ?? 'u-mh-2 u-pb-3', {
      [styles['Page--narrow']]: narrow,
      'u-mv-2': !withoutMarginTop
    })}
  >
    {children}
  </div>
)

export default Page
