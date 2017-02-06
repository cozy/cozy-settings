import styles from '../styles/inputText'

import React from 'react'
import classNames from 'classnames'
import { translate } from '../plugins/preact-polyglot'

const LANGS_OPTIONS = ['en', 'fr']

const Option = ({t, name, optionValue, value}) => (
  <option
    value={optionValue}
    selected={value === optionValue}
  >
    {t(`AccountView.${name}.${optionValue}.text`)}
  </option>
)

const Select = ({ t, name, value, submitting, saved, onChange }) => (
  <div className={classNames(styles['coz-form'], styles['set-field'], {
      [styles['set-field-loading']]: submitting,
      [styles['set-field-saved']]: saved
    })}>
    <h3>{t(`AccountView.${name}.title`)}</h3>
    <label className={styles['coz-desc']}>
      {t(`AccountView.${name}.label`)}
    </label>
    <select
      name={name}
      onBlur={e => onChange(name, e.target.value)}
      >
      {LANGS_OPTIONS.map(lang => (
        <Option
          optionValue={lang}
          name={name}
          value={value}
          t={t}
        />
      ))}
    </select>
  </div>
)

export default translate()(Select)
