import styles from '../styles/accountView'

import React from 'react'
import { translate } from '../plugins/preact-polyglot'
import PassphraseForm from './PassphraseForm'
import InputText from './InputText'
import Select from './Select'

// const AccountView = (props) => {
//   const { t } = props
//   // specific to passphrase form
//   const { onPassphraseSubmit, passphraseErrors, passphraseSubmitting, updateInfos, infosSubmitting, isFetching, instance } = props
//
//   if (isFetching) {
//     return <p>Loading...</p>
//   }
//
//   const attributes = instance.data && instance.data.attributes || {}
//
//   return (
//     <div className={styles['account-view']}>
//       <h2>{t('AccountView.title')}</h2>
//       <InputText
//         inputData='public_name'
//         setValue={attributes.public_name || ''}
//         updateInfos={updateInfos}
//         infosSubmitting={infosSubmitting}
//         t={t}
//       />
//       <PassphraseForm
//         onPassphraseSubmit={onPassphraseSubmit}
//         currentPassErrors={passphraseErrors || []}
//         passphraseSubmitting={passphraseSubmitting}
//         t={t}
//       />
//       <SelectBox
//         inputData='locale'
//         setValue={attributes.locale || ''}
//         updateInfos={updateInfos}
//         infosSubmitting={infosSubmitting}
//         t={t}
//       />
//     </div>
//   )
// }

const AccountView = ({ t, fields, isFetching, onFieldChange }) => (
  <div className={styles['account-view']}>
    { isFetching && <p>Loading...</p> }
    <h2>{t('AccountView.title')}</h2>
    <InputText name='email' type='email' {...fields.email} onChange={onFieldChange} />
    <Select name='locale' {...fields.locale} onChange={onFieldChange} />
  </div>
)

export default translate()(AccountView)
