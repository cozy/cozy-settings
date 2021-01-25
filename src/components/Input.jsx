import styles from 'styles/fields.styl'

import React from 'react'
import Switch from 'cozy-ui/transpiled/react/MuiCozyTheme/Switch'
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
    <Switch
      id={`set-${name.replace(' ', '_')}-toggle`}
      checked={!!value || true}
      color="primary"
      onChange={(ev, checked) => onChange(name, checked)}
    />
  </div>
)

const SwitchOrInput = props => (
  <Field {...props}>
    {props.type === 'checkbox' ? (
      <SwitchCheckBox {...props} />
    ) : (
      <Input {...props} />
    )}
  </Field>
)

export default SwitchOrInput
