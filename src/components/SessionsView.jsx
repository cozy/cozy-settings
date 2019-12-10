import tableStyles from 'styles/table'
import viewStyles from 'styles/view'

import React, { Component } from 'react'
import classNames from 'classnames'

import Spinner from 'cozy-ui/react/Spinner'
import SessionsViewRow from 'components/SessionsViewRow'

import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell
} from 'cozy-ui/react/Table'

class SessionsView extends Component {
  componentWillMount() {
    this.props.fetchSessions()
  }

  render() {
    const { t, f, isFetching, sessions, deleteOtherSessions } = this.props
    return (
      <div role="contentinfo">
        <h2 className={viewStyles['set-view-title']}>
          {t('SessionsView.title')}
        </h2>
        <p className={viewStyles['set-view-title']}>
          <Button
            theme="danger"
            onClick={() => deleteOtherSessions()}
            label={t('SessionsView.delete')}
          />
        </p>
        {isFetching && (
          <Spinner
            className={'u-pos-fixed-s'}
            middle
            size="xxlarge"
            loadingType={t('Loading.loading')}
          />
        )}
        {!isFetching &&
          sessions && (
            <Table className={tableStyles['coz-table']}>
              <TableHead>
                <TableRow>
                  <TableHeader className={tableStyles['set-table-date']}>
                    Date
                  </TableHeader>
                  <TableHeader className={tableStyles['set-table-os']}>
                    OS
                  </TableHeader>
                  <TableHeader className={tableStyles['set-table-browser']}>
                    Browser
                  </TableHeader>
                  <TableHeader className={tableStyles['set-table-ip']}>
                    IP
                  </TableHeader>
                </TableRow>
              </TableHead>
              <TableBody className={tableStyles['set-table-sessions']}>
                {sessions
                  .sort(function(a, b) {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(b.created_at) - new Date(a.created_at)
                  })
                  .map((session, index) => (
                    <SessionsViewRow
                      session={session}
                      t={t}
                      f={f}
                      key={index}
                    />
                  ))}
              </TableBody>
            </Table>
          )}
      </div>
    )
  }
}

export default translate()(SessionsView)
