import React, { Component } from 'react'

import Claudy from '../services/Claudy'

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
        this.props.fetchClaudy()
    }
  }

  terminate (eventName) {
    const service = this.props.service.instance
    service.terminate()
  }

  resizeDefaultClaudy () {
    const { service, claudy } = this.props
    typeof service.instance.resizeClient === 'function' &&
    service.instance.resizeClient({
      height: (((claudy.actions.length <= 5 ? claudy.actions.length : 5) * 80) + 16)
    }, '.2s .2s ease-out')
  }

  render () {
    const { intentType } = this.state
    const { service, claudy } = this.props
    if (claudy.actions.length && service.instance) {
      this.resizeDefaultClaudy()
    }
    switch (intentType) {
      case 'claudy':
        return <Claudy
          claudyInfos={claudy}
          onClose={() => this.terminate()}
          resizeIntent={service.instance && service.instance.resizeClient}
          resizeIntentDefault={() => this.resizeDefaultClaudy()}
        />
    }
  }
}
