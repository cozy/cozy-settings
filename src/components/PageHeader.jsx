import React from 'react'
import PropTypes from 'prop-types'

import Typography from 'cozy-ui/transpiled/react/Typography'

import PageTitle from './PageTitle'

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="u-flex u-mb-1-half u-flex-column-m u-flex-items-center">
      <div className="u-flex-grow-1 u-mb-half-m">
        <PageTitle gutterBottom={false}>{title}</PageTitle>
        <Typography color="textSecondary">{subtitle}</Typography>
      </div>
      <div className="u-ml-1 u-ml-0-m u-flex u-flex-items-center">
        {actions}
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.node
}

export { PageHeader }
