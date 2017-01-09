/*
  This component provides state features to AccountView in order to keep this
  latter as pure as possible in its own definition.
*/

/** @jsx h */
import { h, Component } from 'preact'
import passwordHelper from './passwordHelper'

export default function stateFulPassphraseForm () {
  return function wrapForm (WrappedForm) {
    class StatefulForm extends Component {
      constructor (props) {
        super(props)
        this.state = {
          currentPassphrase: this.configureInput('currentPassphrase'),
          newPassphrase: this.configureInput('newPassphrase', 0),
          isFormValid: false,
          error: null,
          submitPassphrase: this.handleSubmit.bind(this)
        }
      }

      render () {
        return (
          <WrappedForm {...this.props} {...this.state} />
        )
      }

      configureInput (name, strength = null) {
        let option
        const inputObject = {
          dirty: false,
          visible: false,
          value: '',
          errors: [],
          onInput: (event) => this.handleChange(name, event.target ? event.target : { value: event }),
          onChange: (event) => this.handleChange(name, event.target ? event.target : { value: event }),
          toggleVisibility: () => this.toggleVisibility(name)
        }
        if (strength !== null) {
          option = {strength: {percentage: strength, label: 'weak'}}
        }
        return Object.assign({}, inputObject, option)
      }

      toggleVisibility (name) {
        this.setState(prevState => {
          return Object.assign({}, prevState, {
            [name]: Object.assign({}, prevState[name], {
              visible: !prevState[name].visible
            })
          })
        })
      }

      handleChange (name, target) {
        let stateUpdate
        stateUpdate = {
          dirty: target.value !== '',
          value: target.value
        }
        if (name === 'newPassphrase') {
          stateUpdate.strength = passwordHelper.getStrength(target.value)
        }
        this.setState(prevState => {
          return Object.assign({}, prevState, {
            [name]: Object.assign({}, prevState[name], stateUpdate)
          })
        })
        if (this.state.currentPassphrase.dirty &&
          this.state.newPassphrase.dirty) {
          this.setState(prevState => {
            return Object.assign({}, prevState, {
              isFormValid: true
            })
          })
        }
      }

      handleSubmit () {
        const { t } = this.context
        const data = this.getData()
        if (this.props.onPassphraseSubmit && data) {
          if (this.state.newPassphrase.strength.label === 'weak') {
            this.props.notifier.error(
              t('AccountView.password.password_too_weak')
            )
          } else {
            this.props.onPassphraseSubmit(data)
          }
        }
      }

      getData () {
        const data = {}
        if (this.state.currentPassphrase.dirty &&
          this.state.newPassphrase.dirty) {
          data.currentPassphrase = this.state.currentPassphrase.value
          data.newPassphrase = this.state.newPassphrase.value
          return data
        } else return undefined
      }
    }

    return StatefulForm
  }
}
