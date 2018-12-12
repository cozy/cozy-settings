import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'

import { fetchClaudyInfos, createIntentService } from '../actions/services'
import { fetchInfos } from '../actions'
import { sendMessageToSupport } from '../actions/email'

import IntentView from '../components/IntentView'

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
    dispatch(fetchClaudyInfos())
  },
  fetchInfos: () => {
    dispatch(fetchInfos())
  },
  sendMessageToSupport: message => {
    dispatch(sendMessageToSupport(message, ownProps.t))
  }
})

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IntentView)
)
