import { connect } from 'react-redux'

import { fetchSessions, deleteOtherSessions } from '../actions'

import SessionsView from '../components/SessionsView'

const mapStateToProps = (state, ownProps) => ({
  sessions: state.sessions,
  isFetching: state.ui.isFetching
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSessions: () => {
    dispatch(fetchSessions())
  },
  deleteOtherSessions: () => {
    dispatch(deleteOtherSessions())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionsView)
