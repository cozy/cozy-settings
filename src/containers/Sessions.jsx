import { connect } from 'react-redux'

import { fetchSessions, deleteOtherSessions } from '../actions'
import { translate } from 'cozy-ui/react/I18n'

import Alerter from 'cozy-ui/react/Alerter'
import SessionsView from '../components/SessionsView'

const mapStateToProps = (state, ownProps) => ({
  sessions: state.sessions,
  isFetching: state.ui.isFetching
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSessions: () => {
    const { t } = ownProps
    dispatch(fetchSessions()).catch(
      () => Alerter.error(t('SessionsView.infos.server_error'))
    )
  },
  deleteOtherSessions: async () => {
    const { t } = ownProps
    try {
      await dispatch(deleteOtherSessions())
      Alerter.success(t('SessionsView.infos.sessions_deleted'))
    } catch (error) {
      Alerter.error(t('SessionsView.infos.server_error'))
    }
  }
})

export default translate()(connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionsView))
