import styles from '../styles/accountView'

import React from 'react'
import PassphraseForm from './PassphraseForm'
import InputText from './InputText'
import SelectBox from './SelectBox'

const AccountView = (props) => {
  const { t } = props
  // specific to passphrase form
  const { onPassphraseSubmit, passphraseErrors, passphraseSubmitting, isFetching, instance } = props

  if (isFetching) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles['account-view']}>
      <h2>{t('AccountView.title')}</h2>
      <InputText
        inputData='email'
        setValue={instance.email || ''}
        t={t}
      />
      <InputText
        inputData='username'
        setValue={instance.username || ''}
        t={t}
      />
      <PassphraseForm
        onPassphraseSubmit={onPassphraseSubmit}
        currentPassErrors={passphraseErrors || []}
        passphraseSubmitting={passphraseSubmitting}
        t={t}
      />
      <SelectBox
        inputData='lang'
        setValue={instance.locale || ''}
        t={t}
      />
    </div>
  )
}

export default AccountView
