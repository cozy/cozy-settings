import viewStyles from '../styles/view.styl'

import classNames from 'classnames'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { translate } from 'cozy-ui/react/helpers/i18n'
import PassphraseForm from './PassphraseForm'
import Input from './Input'
import Select from './Select'

const LANG_OPTIONS = ['en', 'fr']

const ProfileView = ({ t, fields, passphrase, isFetching, onFieldChange, onPassphraseSubmit }) => (
  <div role='contentinfo'>
    <div className={classNames(viewStyles['set-view-content'], viewStyles['set-view-content--narrow'])}>
      { isFetching && <p>Loading...</p> }
      <h2 className={viewStyles['set-view-title']}>{t('ProfileView.title')}</h2>
      <Input name='email' type='email' {...fields.email} onChange={onFieldChange} />
      <Input name='public_name' type='text' {...fields.public_name} onChange={onFieldChange} />
      <Select name='locale' options={LANG_OPTIONS} {...fields.locale} onChange={onFieldChange} />
      <p>
        <ReactMarkdown
          source={
            t('ProfileView.locale.contrib', {link: 'https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937'})
          }
          renderers={{Link: props => <a href={props.href} target='_blank'>{props.children}</a>}}
        />
      </p>
      <PassphraseForm {...passphrase} onSubmit={onPassphraseSubmit} />
    </div>
  </div>
)

export default translate()(ProfileView)
