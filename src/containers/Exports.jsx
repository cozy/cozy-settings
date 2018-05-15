import { connect } from 'react-redux'

import { fetchExportData } from '../actions/export'
import { translate } from 'cozy-ui/react/I18n'

import StorageView from '../components/StorageView'

const mapStateToProps = (state, ownProps) => ({
  exportStatus: state.export,
  isFetching: state.ui.isFetching
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchExportData: () => {
    dispatch(fetchExportData())
  }
})

export default translate()(connect(
  mapStateToProps,
  mapDispatchToProps
)(StorageView))
