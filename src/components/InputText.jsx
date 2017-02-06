import styles from '../styles/inputText'

import React from 'react'
import classNames from 'classnames'
import { translate } from '../plugins/preact-polyglot'

const InputText = ({ t, name, type = 'text', value, submitting, saved, onChange }) => (
  <div className={classNames(styles['coz-form'], styles['set-field'], {
      [styles['set-field-loading']]: submitting,
      [styles['set-field-saved']]: saved
    })}>
    <h3>{t(`AccountView.${name}.title`)}</h3>
    <label className={styles['coz-desc']}>{t(`AccountView.${name}.label`)}</label>
    <input
      type={type}
      value={value}
      name={name}
      onBlur={e => onChange(name, e.target.value)}
      aria-busy={submitting}
    />
  </div>
)

export default translate()(InputText)
