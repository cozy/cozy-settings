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
import Passphrase2FA from './2FA/Passphrase2FA'

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
      twoFAPassphraseModalIsOpen: false,
      new2FAPassphrase: null,
      mailConfirmationCodeIsValid: false
    }
    this.activate2FA = this.activate2FA.bind(this)
    this.desactivate2FA = this.desactivate2FA.bind(this)
    this.openTwoFAActivationModal = this.openTwoFAActivationModal.bind(this)
    this.closeTwoFAActivationModal = this.closeTwoFAActivationModal.bind(this)
    this.openTwoFADesactivationModal = this.openTwoFADesactivationModal.bind(this)
    this.closeTwoFADesactivationModal = this.closeTwoFADesactivationModal.bind(this)
    this.closeTwoFAPassphraseModal = this.closeTwoFAPassphraseModal.bind(this)
    this.onPassphrase2FAStep1 = this.onPassphrase2FAStep1.bind(this)
    this.onPassphrase2FASubmit = this.onPassphrase2FASubmit.bind(this)
  }
  componentWillMount () {
    this.props.fetchInfos()
  }
  componentWillReceiveProps (nextProps) {
    this.props.fields.two_fa.value !== '' && nextProps.fields.two_fa.value && this.setState({mailConfirmationCodeIsValid: true})
  }
  activate2FA () {
    // TODO: Open the password modal
    this.props.activate2FA()
  }
  desactivate2FA () {
    this.props.desactivate2FA()
    // Reset all the info state
    this.props.updateInfo('two_fa', null)
    this.setState({
      mailConfirmationCodeIsValid: false
    })
    this.closeTwoFADesactivationModal()
  }

  openTwoFAActivationModal () {
    this.setState({twoFAActivationModalIsOpen: true})
  }
  closeTwoFAActivationModal () {
    this.props.cancel2FAActivation()
    this.setState({
      twoFAActivationModalIsOpen: false
    })
  }
  openTwoFADesactivationModal () {
    this.setState({twoFADesactivationModalIsOpen: true})
  }
  closeTwoFADesactivationModal () {
    this.setState({twoFADesactivationModalIsOpen: false})
  }
  closeTwoFAPassphraseModal () {
    this.setState((state, props) => ({
      twoFAPassphraseModalIsOpen: false,
      new2FAPassphrase: null
    }))
  }

  onPassphrase2FAStep1 (current, newVal) {
    this.setState((state, props) => ({
      twoFAPassphraseModalIsOpen: true,
      new2FAPassphrase: newVal
    }))
    this.props.onPassphrase2FAStep1(current)
  }

  onPassphrase2FASubmit (twoFactorCode) {
    const {
      onPassphrase2FAStep2,
      passphrase
    } = this.props
    const { twoFactorToken } = passphrase
    const { new2FAPassphrase } = this.state
    onPassphrase2FAStep2(new2FAPassphrase, twoFactorCode, twoFactorToken)
    .then(() => {
      this.closeTwoFAPassphraseModal()
    })
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
      onPassphraseSimpleSubmit,
      instance,
      twoFactor,
      checkTwoFactorCode
    } = this.props
    const {
      twoFAActivationModalIsOpen,
      twoFADesactivationModalIsOpen,
      twoFAPassphraseModalIsOpen,
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
          <PassphraseForm {...passphrase}
            onSubmit={fields.two_fa.value
              ? this.onPassphrase2FAStep1
              : onPassphraseSimpleSubmit
            }
          />
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
            twoFAPassphraseModalIsOpen &&
            !passphrase.errors &&
            <Passphrase2FA
              onPassphrase2FASubmit={this.onPassphrase2FASubmit}
              closeTwoFAPassphraseModal={this.closeTwoFAPassphraseModal}
              instance={instance}
              submitting={passphrase.submitting2FAStep2}
            />
          }
          {
            twoFAActivationModalIsOpen && <Activate2FA
              activate2FA={() => this.activate2FA()}
              checkTwoFactorCode={checkTwoFactorCode}
              mailConfirmationCodeIsValid={mailConfirmationCodeIsValid}
              closeTwoFAActivationModal={() => this.closeTwoFAActivationModal()}
              instance={instance}
              cozyDomain={cozyDomain}
              isTwoFactorEnabled={fields.two_fa.value}
              twoFactor={twoFactor}
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
              twoFactor={twoFactor}
              closeTwoFADesactivationModal={() => this.closeTwoFADesactivationModal()}
            />
          }
        </div>
      </div>
    )
  }
}

export default translate()(ProfileView)
