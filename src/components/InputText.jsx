import styles from '../styles/inputText'

import React from 'react'

const InputText = ({t, inputData, setValue, infosSubmitting, updateInfos}) => (
  <div className={styles['coz-form']}>
    <h3>{t(`AccountView.${inputData}.title`)}</h3>
    <label className={styles['coz-desc']}>{t(`AccountView.${inputData}.label`)}</label>
    <input
      type='text'
      value={setValue}
      name={inputData}
      onBlur={updateInfos}
    />
  </div>
)

export default InputText
