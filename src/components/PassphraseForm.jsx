import styles from 'styles/fields'

import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'
import Icon from 'cozy-ui/react/Icon'
import palette from 'cozy-ui/stylus/settings/palette.json'

import { PasswordInput } from 'components/Input'
import passwordHelper from 'lib/passwordHelper'

const initialState = {
  currentPassword: '',
  newPassword: '',
  strength: { percentage: 0, label: 'weak' }
}

class PassphraseForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleCurrentInput(e) {
    this.setState({
      currentPassword: e.target.value
    })
  }

  handleNewInput(e) {
    this.setState({
      newPassword: e.target.value,
      strength: passwordHelper.getStrength(e.target.value)
    })
  }

  handleSubmit() {
    this.props
      .onSubmit(this.state.currentPassword, this.state.newPassword)
      .then(() => {
        this.setState(initialState)
      })
  }

  render() {
    const { currentPassword, newPassword, strength } = this.state
    const { t, errors, submitting, saved } = this.props
    const currentPasswordError = errors && errors.currentPassword
    const globalError = errors && errors.global
    const newPasswordError = errors && errors.newPassword
    const twoFactorError = errors && errors.wrongTwoFactor
    const canSubmit = newPassword !== '' && strength.label !== 'weak'
    const STACK_DOMAIN =
      '//' + document.querySelector('[role=application]').dataset.cozyDomain
    const passphraseResetUrl = STACK_DOMAIN + '/auth/passphrase_reset'

    return (
      <form className={styles['coz-form']} onSubmit={this.handleSubmit}>
        <h3>{t('ProfileView.password.title')}</h3>
        <PasswordInput
          label={t('ProfileView.current_password.label')}
          name="current_password"
          key="current_password"
          value={currentPassword}
          inError={currentPasswordError}
          onChange={e => this.handleCurrentInput(e)}
          autocomplete="current-password"
        />
        {currentPasswordError && (
          <p className={styles['coz-form-errors']}>{t(currentPasswordError)}</p>
        )}
        <PasswordInput
          label={t('ProfileView.new_password.label')}
          name="new_password"
          key="new_password"
          value={newPassword}
          inError={newPasswordError}
          onChange={e => this.handleNewInput(e)}
          autocomplete="new-password"
        />
        <progress
          step="1"
          min="0"
          max="100"
          value={strength.percentage}
          className={styles[`pw-${strength.label}`]}
        />
        {newPasswordError && (
          <p className={styles['coz-form-errors']}>{t(newPasswordError)}</p>
        )}
        {globalError && (
          <p className={styles['coz-form-errors']}>{t(globalError)}</p>
        )}
        {twoFactorError && (
          <p className={styles['coz-form-errors']}>{t(twoFactorError)}</p>
        )}
        <div className={styles['coz-form-controls']}>
          <Button
            theme="secondary"
            busy={submitting}
            disabled={!canSubmit}
            label={t('ProfileView.password.submit_label')}
          >
            {saved && (
              <Icon
                className="u-ml-half"
                icon="check-circleless"
                color={palette['emerald']}
              />
            )}
          </Button>
        </div>

        <a href={passphraseResetUrl} className={styles['password-reset-link']}>
          {t('ProfileView.password.reset_link')}
        </a>
      </form>
    )
  }
}

export default translate()(PassphraseForm)
