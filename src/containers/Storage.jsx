import { connect } from 'react-redux'

import { fetchStorageData } from 'actions'
import { translate } from 'cozy-ui/react/I18n'

import Alerter from 'cozy-ui/react/Alerter'
import StorageView from 'components/StorageView'

const mapStateToProps = state => ({
  storageData: state.storageData,
  isFetching: state.ui.isFetching
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchStorageData: () => {
    const { t } = ownProps
    dispatch(fetchStorageData()).catch(() =>
      Alerter.error(t('StorageView.load_error'))
    )
  }
})

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StorageView)
)
