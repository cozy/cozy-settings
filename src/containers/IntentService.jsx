import { connect } from 'react-redux'

import { fetchClaudyInfos, createIntentService } from '../actions/services'
import { fetchInfos } from '../actions'
import { sendMessageToSupport } from '../actions/email'

import IntentView from '../components/IntentView'

const mapStateToProps = (state, ownProps) => ({
  claudy: state.claudy,
  service: state.service,
  emailStatus: state.emailStatus
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createIntentService: (intent, window) => {
    dispatch(createIntentService(intent, window))
  },
  fetchClaudy: () => {
    dispatch(fetchClaudyInfos())
  },
  fetchInfos: () => {
    dispatch(fetchInfos())
  },
  sendMessageToSupport: (message) => {
    dispatch(sendMessageToSupport(message))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentView)
