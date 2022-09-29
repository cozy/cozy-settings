// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { UAParser } from 'ua-parser-js'
import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import tableStyles from 'styles/table.styl'

interface Session {
  user_agent: string
  created_at: string
  os: string
  browser: { name: string; major: string }
  ip: string
}

interface Prop {
  session: Session
}

const SessionDialog = ({ session }: Prop): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { f, t } = useI18n()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
  const ua = UAParser(session.user_agent)
  return (
    <span className={tableStyles['dialog-container']}>
      <p className={tableStyles['dialog-paragraph']}>
        {t('SessionsView.modal_date')}{' '}
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call*/}
        {f(new Date(session.created_at), t('SessionsView.sync_date_format'))}
      </p>
      <p className={tableStyles['dialog-paragraph']}>
        {t('SessionsView.modal_os')} {session.os}
      </p>
      <p className={tableStyles['dialog-paragraph']}>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
        {t('SessionsView.modal_browser')} {ua.browser.name} {ua.browser.major}
      </p>
      <p className={tableStyles['dialog-paragraph']}>
        {t('SessionsView.modal_ip')} {session.ip}
      </p>
    </span>
  )
}

export default SessionDialog
