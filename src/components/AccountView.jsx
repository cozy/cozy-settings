import styles from '../styles/accountView'

import React from 'react'
import PassphraseForm from './PassphraseForm'
import InputText from './InputText'
import SelectBox from './SelectBox'

const AccountView = (props) => {
  const { t } = props
  // specific to passphrase form
  const { onPassphraseSubmit, passphraseErrors, passphraseSubmitting, updateInfos, infosSubmitting, isFetching, instance } = props

  if (isFetching) {
    return <p>Loading...</p>
  }

  const attributes = instance.data.attributes

  return (
    <div className={styles['account-view']}>
      <h2>{t('AccountView.title')}</h2>
      <InputText
        inputData='email'
        setValue={attributes.email || ''}
        updateInfos={updateInfos}
        infosSubmitting={infosSubmitting}
        t={t}
      />
      <InputText
        inputData='public_name'
        setValue={attributes.public_name || ''}
        updateInfos={updateInfos}
        infosSubmitting={infosSubmitting}
        t={t}
      />
      <PassphraseForm
        onPassphraseSubmit={onPassphraseSubmit}
        currentPassErrors={passphraseErrors || []}
        passphraseSubmitting={passphraseSubmitting}
        t={t}
      />
      <SelectBox
        inputData='locale'
        setValue={attributes.locale || ''}
        updateInfos={updateInfos}
        infosSubmitting={infosSubmitting}
        t={t}
      />
    </div>
  )
}

export default AccountView
