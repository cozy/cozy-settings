import styles from '../styles/selectBox'

import React from 'react'
import ReactMarkdown from 'react-markdown'

const langs = ['en', 'fr']

const Option = ({t, InputData, OptionValue, SetValue}) => (
  <option
    value={OptionValue}
    selected={SetValue === OptionValue}
  >
    {t(`AccountView.${InputData}.${OptionValue}.text`)}
  </option>
)

const SelectBox = ({t, InputData, SetValue}) => (
  <div className={styles['coz-form']}>
    <h3>{t(`AccountView.${InputData}.title`)}</h3>
    <label className={styles['coz-desc']}>
      {t(`AccountView.${InputData}.label`)}
    </label>
    <select>
      {
        langs.map(function (lang) {
          return <Option
            OptionValue={lang}
            InputData={InputData}
            t={t}
          />
        })
      }
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
