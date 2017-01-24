/*
  This component wrap the AccountView component to provide store features
*/

/** @jsx h */
import { h, Component } from 'preact'

import AccountView from '../components/AccountView'
import Alerter from '../components/Alerter'
import emailHelper from '../lib/emailHelper'

export default class AccountManagement extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = this.context.store

    this.state = {
      isFetching: false,
      passphraseSubmitting: false,
      passphraseErrors: null,
      instance: {}
    }

    this.fetchAccountInfos()
  }

  render () {
    return (
      <AccountView
        onPassphraseSubmit={(values) => this.updatePassphrase(values)}
        updateInfos={(values) => this.updateInfos(values)}
        {...this.state}
        {...this.context}
      />
    )
  }

  updatePassphrase (values) {
    const { t } = this.context
    this.setState({ passphraseSubmitting: true, passphraseErrors: null })
    this.store.updatePassphrase(values.currentPassphrase, values.newPassphrase)
      .then(response => {
        this.setState({ passphraseSubmitting: false })
        Alerter.success(t('AccountView.password.success'))
      })
      .catch(error => { // eslint-disable-line
        const errors = error.errors || []
        this.setState({ passphraseSubmitting: false })
        if (errors.length && errors[0].detail === 'Invalid passphrase') {
          this.setState({ passphraseErrors: ['wrong_password'] })
        } else {
          Alerter.error(t('AccountView.password.server_error'))
        }
      })
  }

  validInfos (input) {
    const { t } = this.context
    // Check if field is empty or not
    if (input.target.value !== '') {
      // If not empty…
      if (input.target.type === 'text') {
        return true
      } else if ((input.target.type === 'email') && (emailHelper.validate(input.target.value))) {
        return true
      } else {
        Alerter.error(t('AccountView.email.error'))
        return false
      }
    } else {
      Alerter.error(t('AccountView.infos.empty'))
      return false
    }
  }

  updateInfos (input) {
    const { t } = this.context
    if ((this.validInfos(input)) &&
        (this.state.instance.data.attributes[input.target.name] !== input.target.value)) {
      this.setState({ infosSubmitting: true, infosErrors: null })
      let newInstance = Object.assign({}, this.state.instance)
      newInstance.data.attributes[input.target.name] = input.target.value
      this.store.updateInfos(newInstance)
      .then(response => {
        this.setState({
          infosSubmitting: false,
          instance: response
        })
        Alerter.success(t('AccountView.infos.success'))
      })
      .catch(error => { // eslint-disable-line
        this.setState({ infosSubmitting: false })
        Alerter.error(t('AccountView.infos.server_error'))
      })
    }
  }

  fetchAccountInfos () {
    const { t } = this.context
    this.setState({ isFetching: true })
    this.store.fetchSettingsInstance()
      .then(response => {
        this.setState({
          isFetching: false,
          instance: response
        })
      })
      .catch(error => {
        const errors = error.errors || []
        this.setState({
          isFetching: false
        })
        if (errors.length && errors[0].detail) {
          Alerter.error(t(`AccountView.instance.${errors[0].detail}`))
        } else {
          Alerter.error(t('AccountView.instance.server_error'))
        }
      })
  }
}
