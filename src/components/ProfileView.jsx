import viewStyles from '../styles/view'

import classNames from 'classnames'
import React, { Component } from 'react'

import { translate } from 'cozy-ui/react/I18n'

import Input from './Input'
import PassphraseForm from './PassphraseForm'
import ReactMarkdownWrapper from './ReactMarkdownWrapper'
import Select from './Select'
import TwoFA from './2FA'

const LANG_OPTIONS = ['en', 'fr']

class ProfileView extends Component {
  componentWillMount () {
    this.props.fetchInfos()
  }

  render () {
    const {
      t,
      fields,
      passphrase,
      isFetching,
      onFieldChange,
      onPassphraseSimpleSubmit,
      instance,
      updateInfo,
      twoFactor,
      checkTwoFactorCode,
      activate2FA,
      desactivate2FA,
      cancel2FAActivation,
      onPassphrase2FAStep1,
      onPassphrase2FAStep2
    } = this.props
    return (
      <div role='contentinfo'>
        <div className={classNames(viewStyles['set-view-content'], viewStyles['set-view-content--narrow'])}>
          { isFetching && <p>Loading...</p> }
          <h2 className={viewStyles['set-view-title']}>{t('ProfileView.title')}</h2>
          <Input
            name='email'
            type='email'
            title={t('ProfileView.email.title')}
            label={t('ProfileView.email.label')}
            {...fields.email}
            onBlur={onFieldChange} />
          <Input
            name='public_name'
            type='text'
            title={t('ProfileView.public_name.title')}
            label={t(`ProfileView.public_name.label`)}
            {...fields.public_name}
            onBlur={onFieldChange} />
          {!fields.two_fa.value &&
            <PassphraseForm {...passphrase}
              onSubmit={onPassphraseSimpleSubmit}
            />
          }
          <TwoFA
            twoFAField={fields.two_fa}
            passphrase={passphrase}
            instance={instance}
            checkTwoFactorCode={checkTwoFactorCode}
            twoFactor={twoFactor}
            activate2FA={activate2FA}
            desactivate2FA={desactivate2FA}
            cancel2FAActivation={cancel2FAActivation}
            onPassphrase2FAStep1={onPassphrase2FAStep1}
            onPassphrase2FAStep2={onPassphrase2FAStep2}
            updateInfo={updateInfo}
          />
          <Select
            name='locale'
            title={t('ProfileView.locale.title')}
            label={t(`ProfileView.locale.label`)}
            options={LANG_OPTIONS.map(lang => {
              return {
                value: lang,
                text: t(`ProfileView.locale.${lang}.text`)
              }
            })}
            {...fields.locale}
            onChange={onFieldChange} />
          <p>
            <ReactMarkdownWrapper
              source={
                t('ProfileView.locale.contrib', {link: 'https://support.cozy.io/article/114-doubleauthentification'})
              }
            />
          </p>
          <Input
            name='tracking'
            type='checkbox'
            title={t('ProfileView.tracking.title')}
            label={t('ProfileView.tracking.label', {version: instance && instance.data.attributes.tos ? `-${instance.data.attributes.tos}` : '-201711'})}
            {...fields.tracking}
            onChange={onFieldChange}
          />
        </div>
      </div>
    )
  }
}

export default translate()(ProfileView)
