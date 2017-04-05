import styles from '../styles/fields'
import classNames from 'classnames'

import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

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
    const canSubmit = newPassword !== '' && strength.label !== 'weak'
    return (
      <div className={styles['coz-form']}>
        <h3>{t('ProfileView.password.title')}</h3>
        <label className={styles['coz-form-label']}>{t('ProfileView.current_password.label')}</label>
        <PasswordInput
          name='current_password'
          value={currentPassword}
          inError={errors.currentPassword !== undefined}
          onInput={e => this.handleCurrentInput(e)}
        />
        {errors.currentPassword && <p className={styles['coz-form-errors']}>{t(errors.currentPassword)}</p>}
        <label className={styles['coz-form-label']}>{t('ProfileView.new_password.label')}</label>
        <PasswordInput
          name='new_password'
          value={newPassword}
          inError={errors.newPassword !== undefined}
          onInput={e => this.handleNewInput(e)}
        />
        <progress
          step='1' min='0' max='100'
          value={strength.percentage}
          className={styles[`pw-${strength.label}`]}
        />
        {errors.newPassword && <p className={styles['coz-form-errors']}>{t(errors.newPassword)}</p>}
        {errors.global && <p className={styles['coz-form-errors']}>{t(errors.global)}</p>}
        <div className={styles['coz-form-controls']}>
          <button
            role='button'
            className={classNames('coz-btn', 'coz-btn--secondary', {[styles['saved']]: saved})}
            aria-busy={submitting ? 'true' : 'false'}
            onClick={e => this.handleSubmit(e)}
            disabled={!canSubmit}
          >
            {t('ProfileView.password.submit_label')}
          </button>
        </div>

        <a
          href='/auth/passphrase_reset'
          className={styles['password-reset-link']}
        >
          {t('ProfileView.password.reset_link')}
        </a>
      </div>
    )
  }
}

export default translate()(PassphraseForm)
