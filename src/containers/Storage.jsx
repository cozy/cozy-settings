import { connect } from 'react-redux'

import { fetchStorageData } from '../actions'

import StorageView from '../components/StorageView'

const mapStateToProps = (state, ownProps) => ({
  storageData: state.storageData,
  isFetching: state.ui.isFetching
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchStorageData: () => {
    dispatch(fetchStorageData())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StorageView)
