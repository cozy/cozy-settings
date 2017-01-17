import styles from '../styles/passphraseForm'

import React from 'react'

const InputText = ({t, InputData}) => (
  <div className={styles['coz-form']}>
    <h3>{t(`AccountView.${InputData}.title`)}</h3>
    <label className={styles['coz-desc']}>{t(`AccountView.${InputData}.label`)}</label>
    <input
      type='text'
      placeholder={t(`AccountView.${InputData}.placeholder`)}
    />
  </div>
)

export default InputText
