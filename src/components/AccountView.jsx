import styles from '../styles/accountView'

import React from 'react'
import PassphraseForm from './PassphraseForm'

const AccountView = (props) => {
  const { t } = props
  // specific to passphrase form
  const { onPassphraseSubmit, notifier } = props
  return (
    <div class={styles['account-view']}>
      <h2>{t('AccountView.title')}</h2>
      <PassphraseForm
        onPassphraseSubmit={onPassphraseSubmit}
        notifier={notifier}
        t={t}
      />
    </div>
  )
}

export default AccountView
