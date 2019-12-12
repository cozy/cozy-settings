import styles from 'styles/fields'

import React, { useState } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Toggle from 'cozy-ui/react/Toggle'
import Icon from 'cozy-ui/react/Icon'
import InputGroup from 'cozy-ui/react/InputGroup'
import UIInput from 'cozy-ui/react/Input'
import Field from 'components/Field'
import passwordHelper from 'lib/passwordHelper'
import cx from 'classnames'

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
  <input
    type={type}
    placeholder={placeholder}
    defaultValue={value}
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

const PassphraseStrength = props => {
  const { password, className, ...rest } = props
  const strength = passwordHelper.getStrength(password)

  return (
    <progress
      step="1"
      min="0"
      max="100"
      value={strength.percentage}
      className={cx(styles[`pw-${strength.label}`], className)}
      {...rest}
    />
  )
}

const HideShowButton = props => {
  const { hidden, ...rest } = props

  return (
    <button
      type="button"
      style={{
        height: '100%',
        width: 48,
        backgroundColor: 'transparent',
        border: '0'
      }}
      {...rest}
    >
      <Icon
        icon={hidden ? 'eye' : 'eye-closed'}
        size={16}
        color="var(--coolGrey)"
      />
    </button>
  )
}
export const PassphraseInput = props => {
  const { className, showStrength, error, ...rest } = props
  const [hidden, setHidden] = useState(true)

  return (
    <div className={cx(styles['coz-pwd-input'], className)}>
      <InputGroup
        append={
          <HideShowButton hidden={hidden} onClick={() => setHidden(!hidden)} />
        }
        className={cx(
          styles['coz-input-group'],
          showStrength && styles['coz-input-group-with-strength']
        )}
        error={error}
      >
        <UIInput {...rest} type={hidden ? 'password' : 'text'} />
      </InputGroup>
      {showStrength ? (
        <PassphraseStrength
          password={props.value}
          className={styles['coz-pwd-input-strength']}
        />
      ) : null}
    </div>
  )
}
