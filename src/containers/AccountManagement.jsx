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
      submitting: false,
      error: null
    }
  }

  render () {
    return (
      <AccountView
        onPassphraseSubmit={(values) => this.updatePassphrase(values)}
        {...this.state}
        {...this.context}
        notifier={Notifier}
      />
    )
  }

  updatePassphrase (values) {
    const { t } = this.context
    this.setState({ submitting: true })
    this.store.updatePassphrase(values.currentPassphrase, values.newPassphrase)
      .then(response => {
        this.setState({ submitting: false })
        Notifier.info(t('AccountView.password.success'))
      })
      .catch(error => { // eslint-disable-line
        this.setState({ submitting: false })
        Notifier.error(t('AccountView.password.server_error'))
      })
  }
}
