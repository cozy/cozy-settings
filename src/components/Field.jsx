import styles from 'styles/fields'
import viewStyles from 'styles/view'

import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import Spinner from 'cozy-ui/react/Spinner'
import Icon from 'cozy-ui/react/Icon'
import palette from 'cozy-ui/stylus/settings/palette.json'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'

const Field = ({
  t,
  className,
  type,
  title,
  label,
  submitting,
  saved,
  errors,
  children
}) => (
  <div
    className={classNames(styles['coz-form'], styles['set-field'], className, {
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
    <div className="u-pos-relative">
      {children}
      {submitting && (
        <Spinner
          noMargin
          className={classNames(styles['set-field-loading'], 'u-mr-half')}
        />
      )}
      {saved && (
        <Icon
          icon="check-circleless"
          className={classNames(styles['set-field-saved'], 'u-mr-half')}
          color={palette['emerald']}
        />
      )}
    </div>
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
