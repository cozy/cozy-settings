import styles from '../styles/selectBox'

import React from 'react'
import ReactMarkdown from 'react-markdown'

const LANGS_OPTIONS = ['en', 'fr']

const Option = ({t, inputData, optionValue, setValue}) => (
  <option
    value={optionValue}
    selected={setValue === optionValue}
  >
    {t(`AccountView.${inputData}.${optionValue}.text`)}
  </option>
)

const SelectBox = ({t, inputData, setValue, infosSubmitting, updateInfos}) => (
  <div className={styles['coz-form']}>
    <h3>{t(`AccountView.${inputData}.title`)}</h3>
    <label className={styles['coz-desc']}>
      {t(`AccountView.${inputData}.label`)}
    </label>
    <select
      name={inputData}
      onBlur={updateInfos}
      >
      {
        LANGS_OPTIONS.map(function (lang) {
          return <Option
            optionValue={lang}
            inputData={inputData}
            setValue={setValue}
            t={t}
          />
        })
      }
    </select>
    <p className={styles['coz-desc']}>
      <ReactMarkdown
        source={
          t(`AccountView.${inputData}.contrib`, {
            url: 'https://www.transifex.com/cozy/'
          })
        }
        renderers={{Link: props => <a href={props.href} target='_blank'>{props.children}</a>}}
      />
    </p>
  </div>
)

export default SelectBox
