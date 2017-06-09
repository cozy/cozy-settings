import styles from '../styles/fields'
import viewStyles from '../styles/view'

import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/helpers/i18n'
import ReactMarkdownWrapper from './ReactMarkdownWrapper'

const Field = ({ t, type, label, description, submitting, saved, errors, children }) => (
  <div className={classNames(styles['coz-form'], styles['set-field'], {
    [styles['set-field-loading']]: submitting,
    [styles['set-field-saved']]: saved,
    [styles['set-field--checkbox']]: type === 'checkbox'
  })}>
    <h3 className={classNames(viewStyles['set-view-subtitle'], styles['set-field-title'])}>{label}</h3>
    <label className={styles['coz-form-desc']}>
      <ReactMarkdownWrapper
        source={description}
      />
    </label>
    {children}
    {errors && errors.length !== 0 && errors.map(error => (
      <p className={styles['coz-form-errors']}>{t(error)}</p>
    ))}
  </div>
)

export default translate()(Field)
