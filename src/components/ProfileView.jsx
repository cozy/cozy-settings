import viewStyles from '../styles/view'

import classNames from 'classnames'
import React, { Component } from 'react'

import { translate } from 'cozy-ui/react/I18n'

import Input from './Input'
import PassphraseForm from './PassphraseForm'
import ReactMarkdownWrapper from './ReactMarkdownWrapper'
import Select from './Select'
import Activate2FA from './2FA/Activate2FA'
import Desactivate2FA from './2FA/Desactivate2FA'

const LANG_OPTIONS = ['en', 'fr']
const twoFaModalBanner = require('../assets/images/double_authent_prez_banner.svg')
const twoFaModalProtect = require('../assets/images/protect_data_point.svg')
const twoFaModalSecu = require('../assets/images/niv_secu_point.svg')

class ProfileView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      twoFAActivationModalIsOpen: false,
      twoFADesactivationModalIsOpen: false,
      mailConfirmationCodeRequested: false,
      mailConfirmationCodeIsValid: false
    }
    this.activate2FA = this.activate2FA.bind(this)
    this.desactivate2FA = this.desactivate2FA.bind(this)
    this.checkMailConfirmationCode = this.checkMailConfirmationCode.bind(this)
    this.openTwoFAActivationModal = this.openTwoFAActivationModal.bind(this)
    this.closeTwoFAActivationModal = this.closeTwoFAActivationModal.bind(this)
    this.openTwoFADesactivationModal = this.openTwoFADesactivationModal.bind(this)
    this.closeTwoFADesactivationModal = this.closeTwoFADesactivationModal.bind(this)
  }
  componentWillMount () {
    this.props.fetchInfos()
  }
  componentWillReceiveProps (nextProps) {
    this.props.fields.two_fa.value !== '' && nextProps.fields.two_fa.value && this.setState({mailConfirmationCodeIsValid: true})
  }
  activate2FA () {
    // TODO: Open the password modal
    this.props.updateInfo('auth_mode', 'two_factor_mail')
    this.setState({mailConfirmationCodeRequested: true})
  }
  desactivate2FA () {
    // Reset all the info  state
    this.props.updateInfo('two_fa', null)
    this.props.updateInfo('auth_mode', 'basic')
    this.setState({
      mailConfirmationCodeRequested: false,
      mailConfirmationCodeIsValid: false
    })
    this.closeTwoFADesactivationModal()
  }
  checkMailConfirmationCode (code) {
    this.props.checkMailConfirmationCode('mail_confirmation_code', code)
  }
  openTwoFAActivationModal () {
    this.setState({twoFAActivationModalIsOpen: true})
  }
  closeTwoFAActivationModal () {
    this.setState({twoFAActivationModalIsOpen: false})
  }
  openTwoFADesactivationModal () {
    this.setState({twoFADesactivationModalIsOpen: true})
  }
  closeTwoFADesactivationModal () {
    this.setState({twoFADesactivationModalIsOpen: false})
  }
  render () {
    const root = document.querySelector('[role=application]')
    const data = root.dataset
    const cozyDomain = data.cozyDomain
    const {
      t,
      fields,
      passphrase,
      isFetching,
      onFieldChange,
      onPassphraseSubmit,
      instance
    } = this.props
    const {
      twoFAActivationModalIsOpen,
      twoFADesactivationModalIsOpen,
      mailConfirmationCodeRequested,
      mailConfirmationCodeIsValid
    } = this.state
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
            onChange={onFieldChange} />
          <Input
            name='public_name'
            type='text'
            title={t('ProfileView.public_name.title')}
            label={t(`ProfileView.public_name.label`)}
            {...fields.public_name}
            onChange={onFieldChange} />
          <PassphraseForm {...passphrase} onSubmit={onPassphraseSubmit} />
          <Input
            name='two_fa'
            type='checkbox'
            label={t('ProfileView.twofa.title.activate')}
            description={t('ProfileView.twofa.label', {link: 'https://support.cozy.io/article/114-doubleauthentification'})}
            {...fields.two_fa}
            onChange={fields.two_fa.value
              ? this.openTwoFADesactivationModal
              : this.openTwoFAActivationModal
            }
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
            label={t('ProfileView.tracking.label')}
            {...fields.tracking}
            onChange={onFieldChange}
          />
          <a href={t('ProfileView.tos.version', {version: instance && instance.data.attributes.tos ? `-${instance.data.attributes.tos}` : '-201711'})} target='_blank'>
            {t('ProfileView.tos.link')}
          </a>
          {
            twoFAActivationModalIsOpen && <Activate2FA
              activate2FA={() => this.activate2FA()}
              checkMailConfirmationCode={this.checkMailConfirmationCode}
              mailConfirmationCodeRequested={mailConfirmationCodeRequested}
              mailConfirmationCodeIsValid={mailConfirmationCodeIsValid}
              closeTwoFAActivationModal={() => this.closeTwoFAActivationModal()}
              instance={instance}
              cozyDomain={cozyDomain}
              fields={fields}
              onChange={onFieldChange}
              images={{
                'twoFaModalBanner': twoFaModalBanner,
                'twoFaModalSecu': twoFaModalSecu,
                'twoFaModalProtect': twoFaModalProtect
              }}
            />
          }
          {
            twoFADesactivationModalIsOpen && <Desactivate2FA
              desactivate2FA={() => this.desactivate2FA()}
              closeTwoFADesactivationModal={() => this.closeTwoFADesactivationModal()}
            />
          }
        </div>
      </div>
    )
  }
}

export default translate()(ProfileView)
