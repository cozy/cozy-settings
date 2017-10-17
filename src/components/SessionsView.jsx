import tableStyles from '../styles/table'
import viewStyles from '../styles/view'

import React from 'react'
import classNames from 'classnames'

import Loading from './Loading'
import SessionsViewRow from './SessionsViewRow'

import { translate } from 'cozy-ui/react/helpers/i18n'

const SessionsView = ({ t, f, isFetching, sessions }) => {
  return (
    <div role='contentinfo'>
      <h2 className={viewStyles['set-view-title']}>
        {t('SessionsView.title')}
      </h2>
      { isFetching && <Loading /> }
      { !isFetching && sessions && (
        <div className={classNames(
          tableStyles['coz-table']
        )}>
          <div className={classNames(tableStyles['coz-table-head'], tableStyles['coz-table-row'])}>
            <div className={classNames(tableStyles['coz-table-header'], tableStyles['set-table-date'])}>Date</div>
            <div className={classNames(tableStyles['coz-table-header'], tableStyles['set-table-os'])}>OS</div>
            <div className={classNames(tableStyles['coz-table-header'], tableStyles['set-table-browser'])}>Browser</div>
            <div className={classNames(tableStyles['coz-table-header'], tableStyles['set-table-ip'])}>IP</div>
          </div>
          <div className={classNames(tableStyles['coz-table-body'])}>
            {
              sessions
              .sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.created_at) - new Date(a.created_at)
              })
              .map(session => (
                <SessionsViewRow
                  session={session}
                  t={t}
                  f={f}
                />
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default translate()(SessionsView)
