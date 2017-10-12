import React, { Component } from 'react'

import Claudy from '../services/Claudy'
import Support from '../services/Support'

export default class IntentView extends Component {
  constructor (props) {
    super(props)
    const { window } = props
    const intentType = window.location.href.match(/.*\/services\/(.*)\?.*/)[1]
    this.setState({ intentType })
    // Maybe the logic about getting the intent from location.search should be
    // encapsulated in cozy.client.createService
    const intent = window.location.search.split('=')[1]
    this.props.createIntentService(intent, window)
  }

  componentDidMount () {
    switch (this.state.intentType) {
      case 'claudy':
        this.props.fetchInfos()
        this.props.fetchClaudy()
    }
  }

  terminate () {
    const service = this.props.service.instance
    service.terminate()
  }

  render () {
    const { intentType } = this.state
    const { service, claudy, emailStatus, sendMessageToSupport } = this.props
    switch (intentType) {
      case 'claudy':
        return <Claudy
          claudyInfos={claudy}
          onClose={() => this.terminate()}
          service={service}
          emailStatus={emailStatus}
          sendMessageToSupport={sendMessageToSupport}
        />
      case 'support':
        return <Support
          service={service}
          iconSrc={require('../assets/services/claudyActions/icon-question-mark.svg')}
          emailStatus={emailStatus}
          sendMessageToSupport={sendMessageToSupport}
        />
    }
  }
}
