import tableStyles from '../styles/table'

import React from 'react'
import classNames from 'classnames'
import { UAParser } from 'ua-parser-js'

import { translate } from 'cozy-ui/react/I18n'

const SessionsViewRow = ({ f, t, session }) => {
  const ua = UAParser(session.user_agent)
  return (
    <div className={tableStyles['coz-table-row']}>
      <div
        className={classNames(
          tableStyles['coz-table-cell'],
          tableStyles['set-table-date']
        )}
      >
        {f(new Date(session.created_at), t('SessionsView.sync_date_format'))}
      </div>
      <div
        className={classNames(
          tableStyles['coz-table-cell'],
          tableStyles['set-table-os']
        )}
      >
        {session.os}
      </div>
      <div
        className={classNames(
          tableStyles['coz-table-cell'],
          tableStyles['set-table-browser']
        )}
      >
        {ua.browser.name} {ua.browser.major}
      </div>
      <div
        className={classNames(
          tableStyles['coz-table-cell'],
          tableStyles['set-table-ip']
        )}
      >
        {session.ip}
      </div>
    </div>
  )
}

export default translate()(SessionsViewRow)
