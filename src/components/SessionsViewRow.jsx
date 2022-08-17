import tableStyles from 'styles/table.styl'

import React from 'react'
import { UAParser } from 'ua-parser-js'

import { TableRow, TableCell } from 'cozy-ui/transpiled/react/Table'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

const SessionsViewRow = ({ session }) => {
  const { f, t } = useI18n()
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

export default SessionsViewRow
