import cx from 'classnames'
import React from 'react'

interface PageProps {
  children: React.ReactNode
  /** Limit the page content width to 32rem */
  narrow?: boolean
  /** Remove all margins */
  withoutMargin?: boolean
  /** Remove vertical margin */
  withoutVerticalMargin?: boolean
  /** Add extra class */
  className?: string
  /** The page content takes up at least the height of the page */
  fullHeight?: boolean
}

const Page = ({
  children,
  narrow,
  withoutMargin,
  withoutVerticalMargin,
  fullHeight,
  className
}: PageProps): JSX.Element => {
  const hasVerticalMargin = !withoutMargin && !withoutVerticalMargin
  return (
    <div
      className={cx(className ?? 'u-pb-3', {
        'u-maw-6': narrow,
        'u-mh-2': !withoutMargin,
        'u-mv-2': hasVerticalMargin
      })}
      style={{
        minHeight: fullHeight
          ? `calc(100vh - ${hasVerticalMargin ? '10' : '6'}rem)`
          : ''
      }}
    >
      {children}
    </div>
  )
}

export default Page
