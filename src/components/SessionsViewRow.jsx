import tableStyles from 'styles/table'

import React from 'react'
import { UAParser } from 'ua-parser-js'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import { TableRow, TableCell } from 'cozy-ui/transpiled/react/Table'

const SessionsViewRow = ({ f, t, session }) => {
  const ua = UAParser(session.user_agent)
  return (
    <TableRow>
      <TableCell className={tableStyles['set-table-date']}>
        {f(new Date(session.created_at), t('SessionsView.sync_date_format'))}
      </TableCell>
      <TableCell className={tableStyles['set-table-os']}>
        {session.os}
      </TableCell>
      <TableCell className={tableStyles['set-table-browser']}>
        {ua.browser.name} {ua.browser.major}
      </TableCell>
      <TableCell className={tableStyles['set-table-ip']}>
        {session.ip}
      </TableCell>
    </TableRow>
  )
}

export default translate()(SessionsViewRow)
