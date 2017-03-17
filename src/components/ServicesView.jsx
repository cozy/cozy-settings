import tableStyles from '../styles/table'
import viewStyles from '../styles/view.styl'
import classNames from 'classnames'

import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

// import Loading from './Loading'

const DevicesView = ({ t, f, devices }) => (
  <div>
    <h2 className={viewStyles['set-view-title']}>{t('ServicesView.title')}</h2>
    <div className={classNames(tableStyles['coz-table'])}>
      <div className={classNames(tableStyles['coz-table-head'], tableStyles['coz-table-row'])}>
        <div className={classNames(tableStyles['coz-table-header'], tableStyles['coz-table-service'])}>{ t('DevicesView.head_services') }</div>
        <div className={classNames(tableStyles['coz-table-header'], tableStyles['coz-table-account'])}>{ t('DevicesView.head_account') }</div>
        <div className={classNames(tableStyles['coz-table-header'], tableStyles['coz-table-sync'])}>{ t('DevicesView.head_sync') }</div>
        <div className={classNames(tableStyles['coz-table-header'], tableStyles['coz-table-status'])}>{ t('DevicesView.head_status') }</div>
      </div>
    </div>
  </div>
)

export default translate()(DevicesView)
