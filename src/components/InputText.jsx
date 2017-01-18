import styles from '../styles/inputText'

import React from 'react'

const InputText = ({t, InputData, SetValue}) => (
  <div className={styles['coz-form']}>
    <h3>{t(`AccountView.${InputData}.title`)}</h3>
    <label className={styles['coz-desc']}>{t(`AccountView.${InputData}.label`)}</label>
    <input
      type='text'
      value={SetValue}
    />
  </div>
)

export default InputText
