import React, { Component } from 'react'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import Input from 'components/Input'
import Activate2FA from 'components/2FA/Activate2FA'
import Desactivate2FA from 'components/2FA/Desactivate2FA'

const twoFaModalBanner = require('assets/images/double_authent_prez_banner.svg')
const twoFaModalProtect = require('assets/images/protect_data_point.svg')
const twoFaModalSecu = require('assets/images/niv_secu_point.svg')

class TwoFA extends Component {
  constructor(props) {
    super(props)
    this.state = {
      twoFAActivationModalIsOpen: false,
      twoFADesactivationModalIsOpen: false,
      twoFAPassphraseModalIsOpen: false,
      mailConfirmationCodeIsValid: false
    }
    // binding
    this.activate2FA = this.activate2FA.bind(this)
    this.desactivate2FA = this.desactivate2FA.bind(this)
    this.openTwoFAActivationModal = this.openTwoFAActivationModal.bind(this)
    this.closeTwoFAActivationModal = this.closeTwoFAActivationModal.bind(this)
    this.openTwoFADesactivationModal =
      this.openTwoFADesactivationModal.bind(this)
    this.closeTwoFADesactivationModal =
      this.closeTwoFADesactivationModal.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    !this.props.isTwoFactorEnabled &&
      nextProps.isTwoFactorEnabled &&
      this.setState({ mailConfirmationCodeIsValid: true })
  }

  activate2FA() {
    // TODO: Open the password modal
    this.props.activate2FA()
  }

  desactivate2FA() {
    this.props.desactivate2FA()
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

  render() {
    const { t, isTwoFactorEnabled, instance, checkTwoFactorCode, twoFactor } =
      this.props
    const {
      twoFAActivationModalIsOpen,
      twoFADesactivationModalIsOpen,
      mailConfirmationCodeIsValid
    } = this.state
    const root = document.querySelector('[role=application]')
    const data = root.dataset
    const cozyDomain = data.cozyDomain
    return (
      <div>
        <Input
          name="two_fa"
          type="checkbox"
          title={t('ProfileView.twofa.title.activate')}
          label={t('ProfileView.twofa.label', {
            link: 'https://support.cozy.io/article/114-doubleauthentification'
          })}
          value={isTwoFactorEnabled}
          onChange={
            isTwoFactorEnabled
              ? this.openTwoFADesactivationModal
              : this.openTwoFAActivationModal
          }
        />
        {twoFAActivationModalIsOpen && (
          <Activate2FA
            activate2FA={() => this.activate2FA()}
            checkTwoFactorCode={checkTwoFactorCode}
            mailConfirmationCodeIsValid={mailConfirmationCodeIsValid}
            closeTwoFAActivationModal={() => this.closeTwoFAActivationModal()}
            instance={instance}
            cozyDomain={cozyDomain}
            isTwoFactorEnabled={isTwoFactorEnabled}
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
