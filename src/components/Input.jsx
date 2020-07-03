import styles from 'styles/fields'

import React from 'react'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import Toggle from 'cozy-ui/transpiled/react/Toggle'
import Field from 'components/Field'
import UIInput from 'cozy-ui/transpiled/react/Input'

const Input = ({
  name,
  type = 'text',
  placeholder = '',
  value,
  submitting,
  errors,
  onChange,
  onBlur
}) => (
  <UIInput
    type={type}
    placeholder={placeholder}
    defaultValue={value}
    value={undefined}
    name={name}
    onChange={onChange && (e => onChange(name, e.target.value))}
    onBlur={onBlur && (e => onBlur(name, e.target.value))}
    className={errors && errors.length !== 0 ? styles['error'] : ''}
    aria-busy={submitting}
  />
)

const SwitchCheckBox = ({ name, value, onChange }) => (
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
    {props.type === 'checkbox' ? (
      <SwitchCheckBox {...props} />
    ) : (
      <Input {...props} />
    )}
  </Field>
))
