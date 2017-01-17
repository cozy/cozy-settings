import styles from '../styles/passphraseForm'

import React from 'react'
import stateFulPassphraseForm from '../lib/stateFulPassphraseForm'

const PassphraseForm = ({ t, children, passphraseSubmitting, currentPassphrase, newPassphrase, submitPassphrase, isFormValid }) => (
  <div className={styles['coz-form']}>
    <h3>{t('AccountView.password.title')}</h3>
    <label className={styles['coz-label']}>{t('AccountView.password.current_label')}
      <a
        onClick={currentPassphrase.toggleVisibility}
        className={styles['visibility']}
      >
        {currentPassphrase.visible ? 'Hide' : 'Show'}
      </a>
    </label>
    <input
      type={currentPassphrase.visible ? 'text' : 'password'}
      placeholder={t('AccountView.password.current_placeholder')}
      value={currentPassphrase.value}
      onInput={currentPassphrase.onInput}
      onChange={currentPassphrase.onChange}
      className={currentPassphrase.errors.length ? styles['error'] : ''}
    />
    {currentPassphrase.errors.length !== 0 &&
      currentPassphrase.errors.map(e => (
        <p className={styles['coz-errors']}>{t(`AccountView.password.${e}`)}</p>
      ))
    }
    <label className={styles['coz-label']}>{t('AccountView.password.new_label')}
      <a onClick={newPassphrase.toggleVisibility} className={styles['visibility']}>
        {newPassphrase.visible ? 'Hide' : 'Show'}
      </a>
    </label>
    <input
      type={newPassphrase.visible ? 'text' : 'password'}
      placeholder={t('AccountView.password.new_placeholder')}
      value={newPassphrase.value}
      onInput={newPassphrase.onInput}
      onChange={newPassphrase.onChange}
      className={newPassphrase.errors.length ? styles['error'] : ''}
    />
    <progress
      step='1' min='0' max='100'
      value={newPassphrase.strength.percentage}
      className={styles[`pw-${newPassphrase.strength.label}`]} />
    {newPassphrase.errors.length !== 0 &&
      newPassphrase.errors.map(e => (
        <p className={styles['coz-errors']}>{t(`AccountView.password.${e}`)}</p>
      ))
    }
    <a href='#' className={styles['reset-link']}>
      {t('AccountView.password.reset_link')}
    </a>
    <div className={styles['coz-form-controls']}>
      <button
        role='button'
        className={styles['primary']}
        aria-busy={passphraseSubmitting ? 'true' : 'false'}
        onClick={submitPassphrase}
        disabled={!isFormValid}
      >
        Save
      </button>
    </div>
  </div>
)

export default stateFulPassphraseForm()(PassphraseForm)
