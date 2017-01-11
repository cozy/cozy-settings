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

      componentWillReceiveProps (nextProps) {
        // errors returned by the server
        const currentPassErrors = nextProps.currentPassErrors || []
        let error = null
        if (currentPassErrors.length) error = true
        this.setState(prevState => {
          return Object.assign({}, prevState, {
            error: error,
            currentPassphrase: Object.assign(
              {},
              prevState.currentPassphrase,
              {errors: currentPassErrors}
            )
          })
        })
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
        if (this.state.error) this.resetErrors()
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
        const data = this.getData()
        if (this.props.onPassphraseSubmit && data) {
          if (this.state.newPassphrase.strength.label === 'weak') {
            this.setState(prevState => {
              return Object.assign({}, prevState, {
                error: true,
                newPassphrase: Object.assign(
                  {},
                  prevState.newPassphrase,
                  {errors: ['password_too_weak']}
                )
              })
            })
          } else {
            if (this.state.error) this.resetErrors()
            this.props.onPassphraseSubmit(data)
          }
        }
      }

      resetErrors () {
        this.setState(prevState => {
          return Object.assign({}, prevState, {
            error: null,
            currentPassphrase: Object.assign({}, prevState.currentPassphrase, {errors: []}),
            newPassphrase: Object.assign({}, prevState.newPassphrase, {errors: []})
          })
        })
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
