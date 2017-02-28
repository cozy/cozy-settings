import styles from '../styles/fields'

import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/helpers/i18n'

const Field = ({ t, name, submitting, saved, errors, children }) => (
  <div className={classNames(styles['coz-form'], styles['set-field'], {
    [styles['set-field-loading']]: submitting,
    [styles['set-field-saved']]: saved
  })}>
    <h3>{t(`ProfileView.${name}.title`)}</h3>
    <label className={styles['coz-desc']}>
      {t(`ProfileView.${name}.label`)}
    </label>
    {children}
    {errors && errors.length !== 0 && errors.map(error => (
      <p className={styles['coz-errors']}>{t(error)}</p>
    ))}
  </div>
)

export default translate()(Field)
