import styles from '../styles/selectBox'

import React from 'react'
import ReactMarkdown from 'react-markdown'

const SelectBox = ({t, InputData, SetValue}) => (
  <div className={styles['coz-form']}>
    <h3>{t(`AccountView.${InputData}.title`)}</h3>
    <label className={styles['coz-desc']}>
      {t(`AccountView.${InputData}.label`)}
    </label>
    <select>
      <option
        value='fr'
        selected={SetValue === 'fr'}
      >
        {t(`AccountView.${InputData}.french.text`)}
      </option>
      <option
        value='en'
        selected={SetValue === 'en'}
      >
        {t(`AccountView.${InputData}.english.text`)}
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
