import React from 'react'

import UIInput from 'cozy-ui/transpiled/react/Input'
import Switch from 'cozy-ui/transpiled/react/Switch'

import Field from '@/components/Field'

const Input = ({
  name,
  type = 'text',
  placeholder = '',
  value,
  submitting,
  errors,
  onChange,
  onBlur,
  readOnly
}) => {
  return (
    <div className="u-pos-relative">
      <UIInput
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        value={undefined}
        name={name}
        onChange={onChange && (e => onChange(name, e.target.value))}
        onBlur={onBlur && (e => onBlur(name, e.target.value))}
        className={errors && errors.length !== 0 ? 'u-error' : ''}
        aria-busy={submitting}
        readOnly={readOnly}
      />
    </div>
  )
}

const SwitchCheckBox = ({ name, value, onChange }) => (
  <span>
    <Switch
      id={`set-${name.replace(' ', '_')}-toggle`}
      checked={!!value}
      color="primary"
      onChange={(ev, checked) => onChange(name, checked)}
    />
  </span>
)

const SwitchOrInput = props => {
  return (
    <Field {...props}>
      {props.type === 'checkbox' ? (
        <SwitchCheckBox {...props} />
      ) : (
        <Input {...props} />
      )}
    </Field>
  )
}

export default SwitchOrInput
