import React, { Component } from 'react'

import Spinner from 'cozy-ui/transpiled/react/Spinner'
import SessionsViewRow from 'components/SessionsViewRow'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Button } from 'cozy-ui/transpiled/react/Button'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader
} from 'cozy-ui/transpiled/react/Table'
import Typography from 'cozy-ui/transpiled/react/Typography'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import tableStyles from 'styles/table.styl'

class SessionsView extends Component {
  componentWillMount() {
    this.props.fetchSessions()
  }

  render() {
    const { t, f, isFetching, sessions, deleteOtherSessions } = this.props
    return (
      <Page>
        <PageTitle>{t('SessionsView.title')}</PageTitle>
        <Typography variant="body1" className="u-mb-1-half">
          <Button
            className="u-ml-0"
            theme="danger"
            onClick={() => deleteOtherSessions()}
            label={t('SessionsView.delete')}
          />
        </Typography>
        {isFetching && (
          <Spinner
            className={'u-pos-fixed-s'}
            middle
            size="xxlarge"
            loadingType="loading"
          />
        )}
        {!isFetching && sessions && (
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
                  <SessionsViewRow session={session} t={t} f={f} key={index} />
                ))}
            </TableBody>
          </Table>
        )}
      </Page>
    )
  }
}

export default translate()(SessionsView)
