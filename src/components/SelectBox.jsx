import styles from '../styles/passphraseForm'

import React from 'react'

const SelectBox = ({t, InputData}) => (
  <div className={styles['coz-form']}>
    <h3>{t(`AccountView.${InputData}.title`)}</h3>
    <label className={styles['coz-desc']}>{t(`AccountView.${InputData}.label`)}</label>
    <select>
      <option value='en'>English</option>
      <option value='fr'>Français</option>
    </select>
  </div>
)

export default SelectBox
