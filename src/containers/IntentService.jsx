import { connect } from 'react-redux'
import compose from 'lodash/flowRight'

import { withClient } from 'cozy-client'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'

import { fetchClaudyInfos, createIntentService } from '@/actions/services'
import { fetchInfos } from '@/actions'
import { sendMessageToSupport } from '@/actions/email'

import IntentView from '@/components/IntentView'

const mapStateToProps = state => ({
  claudy: state.claudy,
  service: state.service,
  emailStatus: state.emailStatus
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createIntentService: (intent, window) => {
    dispatch(createIntentService(intent, window))
  },
  fetchClaudy: () => {
    dispatch(fetchClaudyInfos(ownProps.client))
  },
  fetchInfos: () => {
    dispatch(fetchInfos())
  },
  sendMessageToSupport: message => {
    dispatch(sendMessageToSupport(ownProps.client, message, ownProps.t))
  }
})

export default compose(
  translate(),
  withClient,
  connect(mapStateToProps, mapDispatchToProps)
)(IntentView)
