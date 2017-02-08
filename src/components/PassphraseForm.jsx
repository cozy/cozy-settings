import styles from '../styles/fields'

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
  handleCurrentInput = e => {
    this.setState({
      currentPassword: e.target.value
    })
  }

  handleNewInput = e => {
    this.setState({
      newPassword: e.target.value,
      strength: passwordHelper.getStrength(e.target.value)
    })
  }

  handleSubmit = e => {
    this.props.onSubmit(this.state.currentPassword, this.state.newPassword)
      .then(() => {
        this.setState(initialState)
      })
  }

  constructor (props) {
    super(props)
    this.state = initialState
  }

  render () {
    const { t, errors, submitting } = this.props
    const { currentPassword, newPassword, strength } = this.state
    const canSubmit = newPassword !== '' && strength.label !== 'weak'
    return (
      <div className={styles['coz-form']}>
        <h3>{t('AccountView.password.title')}</h3>
        <label className={styles['coz-label']}>{t('AccountView.current_password.label')}</label>
        <PasswordInput
          name='current_password'
          value={currentPassword}
          inError={errors.currentPassword !== undefined}
          onInput={this.handleCurrentInput}
        />
        {errors.currentPassword && <p className={styles['coz-errors']}>{t(errors.currentPassword)}</p>}
        <label className={styles['coz-label']}>{t('AccountView.new_password.label')}</label>
        <PasswordInput
          name='new_password'
          value={newPassword}
          inError={errors.newPassword !== undefined}
          onInput={this.handleNewInput}
        />
        <progress
          step='1' min='0' max='100'
          value={strength.percentage}
          className={styles[`pw-${strength.label}`]}
        />
        {errors.newPassword && <p className={styles['coz-errors']}>{t(errors.newPassword)}</p>}
        {errors.global && <p className={styles['coz-errors']}>{t(errors.global)}</p>}
        <a href='#' className={styles['password-reset-link']}>
          {t('AccountView.password.reset_link')}
        </a>
        <div className={styles['coz-form-controls']}>
          <button
            role='button'
            className={styles['primary']}
            aria-busy={submitting ? 'true' : 'false'}
            onClick={this.handleSubmit}
            disabled={!canSubmit}
          >
            Save
          </button>
        </div>
      </div>
    )
  }
}

export default translate()(PassphraseForm)
