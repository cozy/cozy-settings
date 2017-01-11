import styles from '../styles/passphraseForm'

import React from 'react'
import stateFulPassphraseForm from '../lib/stateFulPassphraseForm'

const PassphraseForm = ({ t, children, passphraseSubmitting, currentPassphrase, newPassphrase, submitPassphrase, isFormValid }) => (
  <div class={styles['coz-form']}>
    <h3>{t('AccountView.password.title')}</h3>
    <label>{t('AccountView.password.current_label')}
      <a
        onClick={currentPassphrase.toggleVisibility}
        class={styles['visibility']}
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
      class={currentPassphrase.errors.length ? styles['error'] : ''}
    />
    {currentPassphrase.errors.length !== 0 &&
      currentPassphrase.errors.map(e => (
        <p class={styles['coz-errors']}>{t(`AccountView.password.${e}`)}</p>
      ))
    }
    <label>{t('AccountView.password.new_label')}
      <a onClick={newPassphrase.toggleVisibility} class={styles['visibility']}>
        {newPassphrase.visible ? 'Hide' : 'Show'}
      </a>
    </label>
    <input
      type={newPassphrase.visible ? 'text' : 'password'}
      placeholder={t('AccountView.password.new_placeholder')}
      value={newPassphrase.value}
      onInput={newPassphrase.onInput}
      onChange={newPassphrase.onChange}
      class={newPassphrase.errors.length ? styles['error'] : ''}
    />
    <progress
      step='1' min='0' max='100'
      value={newPassphrase.strength.percentage}
      class={styles[`pw-${newPassphrase.strength.label}`]} />
    {newPassphrase.errors.length !== 0 &&
      newPassphrase.errors.map(e => (
        <p class={styles['coz-errors']}>{t(`AccountView.password.${e}`)}</p>
      ))
    }
    <a href='#' class={styles['reset-link']}>
      {t('AccountView.password.reset_link')}
    </a>
    <div class={styles['coz-form-controls']}>
      <button
        role='button'
        class={styles['primary']}
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
