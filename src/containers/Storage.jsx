import { connect } from 'react-redux'
import compose from 'lodash/flowRight'

import { withClient } from 'cozy-client'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import StorageView from 'components/StorageView'
import { fetchStorageData } from 'actions'

const mapStateToProps = state => ({
  storageData: state.storageData,
  isFetching: state.ui.isFetching
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchStorageData: () => {
    const { t, client } = ownProps
    dispatch(fetchStorageData(client)).catch(() =>
      Alerter.error(t('StorageView.load_error'))
    )
  }
})

export default compose(
  translate(),
  withClient,
  connect(mapStateToProps, mapDispatchToProps)
)(StorageView)
