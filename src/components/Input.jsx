import styles from '../styles/fields'

import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import withState from 'cozy-ui/react/helpers/withState'
import Toggle from 'cozy-ui/react/Toggle'
import Field from './Field'

const Input = ({ t, name, type = 'text', placeholder = '', value, submitting, errors, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    name={name}
    onBlur={e => onChange(name, e.target.value)}
    className={errors && errors.length !== 0 ? styles['error'] : ''}
    aria-busy={submitting}
  />
)

const SwitchCheckBox = ({name, value, submitting, errors, onChange}) => (
  <div className={styles['set-toggle']}>
    <Toggle
      id={`set-${name.replace(' ', '_')}-toggle`}
      checked={!!value}
      onToggle={checked => onChange(name, checked)}
    />
  </div>
)

export default translate()(props => (
  <Field {...props}>
    {props.type === 'checkbox'
      ? <SwitchCheckBox {...props} />
      : <Input {...props} />
    }
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
      const { t, name, value, onInput, toggleVisibility, visible, autocomplete, inError = false } = props
      return (
        <div className={styles['coz-form-group']}>
          <a
            onClick={toggleVisibility}
            className={styles['password-visibility']}
          >
            {visible ? t(`ProfileView.password.hide`) : t(`ProfileView.password.show`)}
          </a>
          <input
            type={visible ? 'text' : 'password'}
            placeholder={t(`ProfileView.${name}.placeholder`)}
            value={value}
            onInput={onInput}
            className={inError ? styles['error'] : ''}
            autocomplete={autocomplete || 'off'}
          />
        </div>
      )
    }
  )
)
