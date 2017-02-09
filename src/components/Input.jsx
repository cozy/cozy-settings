import styles from '../styles/fields'

import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'
import withState from 'cozy-ui/react/helpers/withState'
import Field from './Field'

const Input = ({ t, name, type = 'text', value, submitting, errors, onChange }) => (
  <input
    type={type}
    value={value}
    name={name}
    onBlur={e => onChange(name, e.target.value)}
    className={errors && errors.length !== 0 ? styles['error'] : ''}
    aria-busy={submitting}
  />
)

export default translate()(props => (
  <Field {...props}>
    <Input {...props} />
  </Field>
))

export const PasswordInput = translate()(
  withState({
    visible: false
  }, (setState) => ({
    toggleVisibility: () => {
      setState(state => ({ visible: !state.visible }))
    }
  }))(
    props => {
      const { t, name, value, onInput, toggleVisibility, visible, inError = false } = props
      return (
        <div className={styles['coz-form-group']}>
          <a
            onClick={toggleVisibility}
            className={styles['password-visibility']}
          >
            {visible ? 'Hide' : 'Show'}
          </a>
          <input
            type={visible ? 'text' : 'password'}
            placeholder={t(`AccountView.${name}.placeholder`)}
            value={value}
            onInput={onInput}
            className={inError ? styles['error'] : ''}
          />
        </div>
      )
    }
  )
)
