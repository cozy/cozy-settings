import { connect } from 'react-redux'

import { fetchClaudyInfos, createIntentService } from '../actions/services'
import { fetchInfos } from '../actions'

import IntentView from '../components/IntentView'

const mapStateToProps = (state, ownProps) => ({
  claudy: state.claudy,
  service: state.service,
  instance: state.instance
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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentView)
