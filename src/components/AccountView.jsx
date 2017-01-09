import styles from '../styles/accountView'

import React from 'react'
import stateFulPassphraseForm from '../lib/stateFulPassphraseForm'

const AccountView = ({ t, children, submitting, currentPassphrase, newPassphrase, submitPassphrase, isFormValid }) => (
  <div class={styles['account-view']}>
    <h2>{t('AccountView.title')}</h2>
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
      />
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
      />
      <progress
        step='1' min='0' max='100'
        value={newPassphrase.strength.percentage}
        class={styles[`pw-${newPassphrase.strength.label}`]} />
      <a href='#'>{t('AccountView.password.reset_link')}</a>
      <div class={styles['coz-form-controls']}>
        <button
          role='button'
          aria-busy={submitting ? 'true' : 'false'}
          onClick={submitPassphrase}
          disabled={!isFormValid}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)

export default stateFulPassphraseForm()(AccountView)
