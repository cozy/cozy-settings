import styles from '../styles/accountView'

import React from 'react'
import PassphraseForm from './PassphraseForm'
import InputText from './InputText'
import SelectBox from './SelectBox'

const AccountView = (props) => {
  const { t } = props
  // specific to passphrase form
  const { onPassphraseSubmit, passphraseErrors, passphraseSubmitting } = props
  return (
    <div className={styles['account-view']}>
      <h2>{t('AccountView.title')}</h2>
      <InputText
        InputData='email'
        t={t}
      />
      <InputText
        InputData='username'
        t={t}
      />
      <PassphraseForm
        onPassphraseSubmit={onPassphraseSubmit}
        currentPassErrors={passphraseErrors || []}
        passphraseSubmitting={passphraseSubmitting}
        t={t}
      />
      <SelectBox
        InputData='lang'
        t={t}
      />
    </div>
  )
}

export default AccountView
