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
          onInput={e => this.handleCurrentInput(e)}
        />
        {errors.currentPassword && <p className={styles['coz-errors']}>{t(errors.currentPassword)}</p>}
        <label className={styles['coz-label']}>{t('AccountView.new_password.label')}</label>
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
        {errors.newPassword && <p className={styles['coz-errors']}>{t(errors.newPassword)}</p>}
        {errors.global && <p className={styles['coz-errors']}>{t(errors.global)}</p>}
        <div className={styles['coz-form-controls']}>
          <button
            role='button'
            className={styles['secondary']}
            aria-busy={submitting ? 'true' : 'false'}
            onClick={e => this.handleSubmit(e)}
            disabled={!canSubmit}
          >
            {t('AccountView.password.submit_label')}
          </button>
        </div>
        <a href='#' className={styles['password-reset-link']}>
          {t('AccountView.password.reset_link')}
        </a>
      </div>
    )
  }
}

export default translate()(PassphraseForm)
