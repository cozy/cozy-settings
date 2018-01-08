import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Field from './Field'

const Select = ({ t, name, value, options, onChange }) => (
  <select
    name={name}
    onChange={e => onChange(name, e.target.value)}
    >
    {options.map(opt => (
      <option
        value={opt.value}
        selected={value === opt.value}
      >
        {opt.text}
      </option>
    ))}
  </select>
)

export default translate()(props => (
  <Field {...props}>
    <Select {...props} />
  </Field>
))
