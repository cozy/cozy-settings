import styles from '../styles/fields'
import classNames from 'classnames'

import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'

import { PasswordInput } from './Input'
import passwordHelper from '../lib/passwordHelper'

const initialState = {
  currentPassword: '',
  newPassword: '',
  strength: { percentage: 0, label: 'weak' }
}

class PassphraseForm extends Component {
  constructor (props) {
    super(props)
    this.state = initialState
  }

  handleCurrentInput (e) {
    this.setState({
      currentPassword: e.target.value
    })
  }

  handleNewInput (e) {
    this.setState({
      newPassword: e.target.value,
      strength: passwordHelper.getStrength(e.target.value)
    })
  }

  handleSubmit (e) {
    this.props.onSubmit(this.state.currentPassword, this.state.newPassword)
      .then(() => {
        this.setState(initialState)
      })
  }

  render () {
    const { currentPassword, newPassword, strength } = this.state
    const { t, errors, submitting, saved } = this.props
    const currentPasswordError = errors && errors.currentPassword
    const globalError = errors && errors.global
    const newPasswordError = errors && errors.newPassword
    const twoFactorError = errors && errors.wrongTwoFactor
    const canSubmit = newPassword !== '' && strength.label !== 'weak'
    const STACK_DOMAIN = '//' + document.querySelector('[role=application]').dataset.cozyDomain
    const passphraseResetUrl = STACK_DOMAIN + '/auth/passphrase_reset'

    return (
      <div className={styles['coz-form']}>
        <h3>{t('ProfileView.password.title')}</h3>
        <label className={styles['coz-form-label']}>{t('ProfileView.current_password.label')}</label>
        <PasswordInput
          name='current_password'
          value={currentPassword}
          inError={currentPasswordError}
          onInput={e => this.handleCurrentInput(e)}
          autocomplete='current-password'
        />
        {currentPasswordError && <p className={styles['coz-form-errors']}>{t(currentPasswordError)}</p>}
        <label className={styles['coz-form-label']}>{t('ProfileView.new_password.label')}</label>
        <PasswordInput
          name='new_password'
          value={newPassword}
          inError={newPasswordError}
          onInput={e => this.handleNewInput(e)}
          autocomplete='new-password'
        />
        <progress
          step='1' min='0' max='100'
          value={strength.percentage}
          className={styles[`pw-${strength.label}`]}
        />
        {newPasswordError && <p className={styles['coz-form-errors']}>{t(newPasswordError)}</p>}
        {globalError && <p className={styles['coz-form-errors']}>{t(globalError)}</p>}
        {twoFactorError && <p className={styles['coz-form-errors']}>{t(twoFactorError)}</p>}
        <div className={styles['coz-form-controls']}>
          <Button
            className={classNames({[styles['saved']]: saved})}
            theme='secondary'
            busy={submitting ? 'true' : 'false'}
            onClick={e => this.handleSubmit(e)}
            disabled={!canSubmit}
          >
            {t('ProfileView.password.submit_label')}
          </Button>
        </div>

        <a
          href={passphraseResetUrl}
          className={styles['password-reset-link']}
        >
          {t('ProfileView.password.reset_link')}
        </a>
      </div>
    )
  }
}

export default translate()(PassphraseForm)
