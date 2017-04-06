import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'
import Field from './Field'

const Select = ({ t, name, value, options, onChange }) => (
  <select
    name={name}
    onBlur={e => onChange(name, e.target.value)}
    >
    {options.map(opt => (
      <option
        value={opt[0].value}
        selected={value === opt[0].value}
      >
        {opt[0].text}
      </option>
    ))}
  </select>
)

export default translate()(props => (
  <Field {...props}>
    <Select {...props} />
  </Field>
))
