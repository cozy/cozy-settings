import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'

import Input from '../Input'
import PassphraseForm from '../PassphraseForm'
import Passphrase2FA from './Passphrase2FA'
import Activate2FA from './Activate2FA'
import Desactivate2FA from './Desactivate2FA'

const twoFaModalBanner = require('../../assets/images/double_authent_prez_banner.svg')
const twoFaModalProtect = require('../../assets/images/protect_data_point.svg')
const twoFaModalSecu = require('../../assets/images/niv_secu_point.svg')

class TwoFA extends Component {
  constructor(props) {
    super(props)
    this.state = {
      twoFAActivationModalIsOpen: false,
      twoFADesactivationModalIsOpen: false,
      twoFAPassphraseModalIsOpen: false,
      new2FAPassphrase: null,
      mailConfirmationCodeIsValid: false
    }
    // binding
    this.activate2FA = this.activate2FA.bind(this)
    this.desactivate2FA = this.desactivate2FA.bind(this)
    this.openTwoFAActivationModal = this.openTwoFAActivationModal.bind(this)
    this.closeTwoFAActivationModal = this.closeTwoFAActivationModal.bind(this)
    this.openTwoFADesactivationModal = this.openTwoFADesactivationModal.bind(
      this
    )
    this.closeTwoFADesactivationModal = this.closeTwoFADesactivationModal.bind(
      this
    )
    this.closeTwoFAPassphraseModal = this.closeTwoFAPassphraseModal.bind(this)
    this.onPassphrase2FAStep1 = this.onPassphrase2FAStep1.bind(this)
    this.onPassphrase2FASubmit = this.onPassphrase2FASubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.props.twoFAField.value !== '' &&
      nextProps.twoFAField.value &&
      this.setState({ mailConfirmationCodeIsValid: true })
  }

  activate2FA() {
    // TODO: Open the password modal
    this.props.activate2FA()
  }

  desactivate2FA() {
    this.props.desactivate2FA()
    // Reset all the info state
    this.props.updateInfo('two_fa', null)
    this.setState({
      mailConfirmationCodeIsValid: false
    })
    this.closeTwoFADesactivationModal()
  }

  openTwoFAActivationModal() {
    this.setState({ twoFAActivationModalIsOpen: true })
  }
  closeTwoFAActivationModal() {
    this.props.cancel2FAActivation()
    this.setState({
      twoFAActivationModalIsOpen: false
    })
  }
  openTwoFADesactivationModal() {
    this.setState({ twoFADesactivationModalIsOpen: true })
  }
  closeTwoFADesactivationModal() {
    this.setState({ twoFADesactivationModalIsOpen: false })
  }
  closeTwoFAPassphraseModal() {
    this.setState(() => ({
      twoFAPassphraseModalIsOpen: false,
      new2FAPassphrase: null
    }))
  }

  onPassphrase2FAStep1(current, newVal) {
    this.setState(() => ({
      twoFAPassphraseModalIsOpen: true,
      new2FAPassphrase: newVal
    }))
    this.props.onPassphrase2FAStep1(current)
  }

  onPassphrase2FASubmit(twoFactorCode) {
    const { onPassphrase2FAStep2, passphrase } = this.props
    const { twoFactorToken } = passphrase
    const { new2FAPassphrase } = this.state
    onPassphrase2FAStep2(new2FAPassphrase, twoFactorCode, twoFactorToken).then(
      () => {
        this.closeTwoFAPassphraseModal()
      }
    )
  }

  render() {
    const {
      t,
      twoFAField,
      passphrase,
      instance,
      checkTwoFactorCode,
      twoFactor
    } = this.props
    const {
      twoFAActivationModalIsOpen,
      twoFADesactivationModalIsOpen,
      twoFAPassphraseModalIsOpen,
      mailConfirmationCodeIsValid
    } = this.state
    const root = document.querySelector('[role=application]')
    const data = root.dataset
    const cozyDomain = data.cozyDomain
    return (
      <div>
        {twoFAField.value && (
          <PassphraseForm
            {...passphrase}
            onSubmit={this.onPassphrase2FAStep1}
          />
        )}
        <Input
          name="two_fa"
          type="checkbox"
          title={t('ProfileView.twofa.title.activate')}
          label={t('ProfileView.twofa.label', {
            link: 'https://support.cozy.io/article/114-doubleauthentification'
          })}
          {...twoFAField}
          onChange={
            twoFAField.value
              ? this.openTwoFADesactivationModal
              : this.openTwoFAActivationModal
          }
        />
        {twoFAPassphraseModalIsOpen &&
          !passphrase.errors &&
          !passphrase.submitting && (
            <Passphrase2FA
              onPassphrase2FASubmit={this.onPassphrase2FASubmit}
              closeTwoFAPassphraseModal={this.closeTwoFAPassphraseModal}
              instance={instance}
              submitting={passphrase.submitting2FAStep2}
            />
          )}
        {twoFAActivationModalIsOpen && (
          <Activate2FA
            activate2FA={() => this.activate2FA()}
            checkTwoFactorCode={checkTwoFactorCode}
            mailConfirmationCodeIsValid={mailConfirmationCodeIsValid}
            closeTwoFAActivationModal={() => this.closeTwoFAActivationModal()}
            instance={instance}
            cozyDomain={cozyDomain}
            isTwoFactorEnabled={twoFAField.value}
            twoFactor={twoFactor}
            images={{
              twoFaModalBanner: twoFaModalBanner,
              twoFaModalSecu: twoFaModalSecu,
              twoFaModalProtect: twoFaModalProtect
            }}
          />
        )}
        {twoFADesactivationModalIsOpen && (
          <Desactivate2FA
            desactivate2FA={() => this.desactivate2FA()}
            twoFactor={twoFactor}
            closeTwoFADesactivationModal={() =>
              this.closeTwoFADesactivationModal()
            }
          />
        )}
      </div>
    )
  }
}

export default translate()(TwoFA)
