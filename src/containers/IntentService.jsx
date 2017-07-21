import { connect } from 'react-redux'

import { fetchClaudyInfos, createIntentService } from '../actions'

import IntentView from '../components/IntentView'

const mapStateToProps = (state, ownProps) => ({
  claudy: state.claudy,
  service: state.service
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createIntentService: (intent, window) => {
    dispatch(createIntentService(intent, window))
  },
  fetchClaudy: () => {
    dispatch(fetchClaudyInfos())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentView)
