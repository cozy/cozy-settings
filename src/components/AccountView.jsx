import styles from '../styles/accountView'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { translate } from '../plugins/preact-polyglot'
import PassphraseForm from './PassphraseForm'
import InputText from './InputText'
import Select from './Select'

const AccountView = ({ t, fields, isFetching, onFieldChange }) => (
  <div className={styles['account-view']}>
    { isFetching && <p>Loading...</p> }
    <h2>{t('AccountView.title')}</h2>
    <InputText name='email' type='email' {...fields.email} onChange={onFieldChange} />
    <Select name='locale' {...fields.locale} onChange={onFieldChange} />
    <p className={styles['account-view-desc']}>
      <ReactMarkdown
        source={
          t(`AccountView.locale.contrib`)
        }
        renderers={{Link: props => <a href={props.href} target='_blank'>{props.children}</a>}}
      />
    </p>
  </div>
)

export default translate()(AccountView)
