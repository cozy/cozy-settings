import styles from '../styles/fields'

import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Toggle from 'cozy-ui/react/Toggle'
import Field from './Field'

const Input = ({ t, name, type = 'text', placeholder = '', value, submitting, errors, onChange, onBlur }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    name={name}
    onChange={onChange && (e => onChange(name, e.target.value))}
    onBlur={onBlur && (e => onBlur(name, e.target.value))}
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

class PasswordInputComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    this.toggleVisibility = this.toggleVisibility.bind(this)
  }

  toggleVisibility () {
    this.setState(state => ({ visible: !state.visible }))
  }

  render () {
    const { t, name, value, onInput, autocomplete, inError = false } = this.props
    const { visible } = this.state
    return (
      <div className={styles['coz-form-group']}>
        <a
          onClick={this.toggleVisibility}
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
}

export const PasswordInput = translate()(PasswordInputComponent)
