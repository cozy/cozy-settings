/*
  This component wrap the AccountView component to provide store features
*/

/** @jsx h */
import { h, Component } from 'preact'

import AccountView from '../components/AccountView'
import Notifier from '../components/Notifier'

export default class AccountManagement extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = this.context.store

    this.state = {
      passphraseSubmitting: false,
      passphraseErrors: null
    }
  }

  render () {
    return (
      <AccountView
        onPassphraseSubmit={(values) => this.updatePassphrase(values)}
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
        Notifier.info(t('AccountView.password.success'))
      })
      .catch(error => { // eslint-disable-line
        const errors = error.errors || []
        this.setState({ passphraseSubmitting: false })
        if (errors.length && errors[0].detail === 'Invalid passphrase') {
          this.setState({ passphraseErrors: ['wrong_password'] })
        } else {
          Notifier.error(t('AccountView.password.server_error'))
        }
      })
  }
}
