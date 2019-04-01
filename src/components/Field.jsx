import styles from 'styles/fields'
import viewStyles from 'styles/view'

import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'

const Field = ({
  t,
  type,
  title,
  label,
  submitting,
  saved,
  errors,
  children
}) => (
  <div
    className={classNames(styles['coz-form'], styles['set-field'], {
      [styles['set-field-loading']]: submitting,
      [styles['set-field-saved']]: saved,
      [styles['set-field-input']]: type !== 'checkbox',
      [styles['set-field-checkbox']]: type === 'checkbox'
    })}
  >
    <h3
      className={classNames(
        viewStyles['set-view-subtitle'],
        styles['set-field-title']
      )}
    >
      {title}
    </h3>
    <label className={styles['coz-form-desc']}>
      <ReactMarkdownWrapper source={label} />
    </label>
    {children}
    {errors &&
      errors.length !== 0 &&
      errors.map((error, index) => (
        <p className={styles['coz-form-errors']} key={index}>
          {t(error)}
        </p>
      ))}
  </div>
)

export default translate()(Field)
