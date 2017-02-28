import styles from '../styles/profileView'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { translate } from 'cozy-ui/react/helpers/i18n'
import PassphraseForm from './PassphraseForm'
import Input from './Input'
import Select from './Select'

const LANG_OPTIONS = ['en', 'fr']

const ProfileView = ({ t, fields, passphrase, isFetching, onFieldChange, onPassphraseSubmit }) => (
  <div className={styles['profile-view']}>
    { isFetching && <p>Loading...</p> }
    <h2>{t('ProfileView.title')}</h2>
    <Input name='email' type='email' {...fields.email} onChange={onFieldChange} />
    <Input name='public_name' type='text' {...fields.public_name} onChange={onFieldChange} />
    <Select name='locale' options={LANG_OPTIONS} {...fields.locale} onChange={onFieldChange} />
    <p className={styles['profile-view-desc']}>
      <ReactMarkdown
        source={
          t(`ProfileView.locale.contrib`)
        }
        renderers={{Link: props => <a href={props.href} target='_blank'>{props.children}</a>}}
      />
    </p>
    <PassphraseForm {...passphrase} onSubmit={onPassphraseSubmit} />
  </div>
)

export default translate()(ProfileView)
