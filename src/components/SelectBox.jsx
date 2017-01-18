import styles from '../styles/passphraseForm'

import React from 'react'
import ReactMarkdown from 'react-markdown'

const SelectBox = ({t, InputData}) => (
  <div className={styles['coz-form']}>
    <h3>{t(`AccountView.${InputData}.title`)}</h3>
    <label className={styles['coz-desc']}>
      {t(`AccountView.${InputData}.label`)}
    </label>
    <select>
      <option value={t(`AccountView.${InputData}.english.value`)}>
        {t(`AccountView.${InputData}.english.text`)}
      </option>
      <option value={t(`AccountView.${InputData}.french.value`)}>
        {t(`AccountView.${InputData}.french.text`)}
      </option>
    </select>
    <p className={styles['coz-desc']}>
      <ReactMarkdown source={
        t(`AccountView.${InputData}.contrib`, {
          url: 'http://cozy.io'
        })
      } />
    </p>
  </div>
)

export default SelectBox
