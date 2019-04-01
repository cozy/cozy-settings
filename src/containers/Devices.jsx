import { connect } from 'react-redux'

import {
  deviceModaleRevokeOpen,
  deviceModaleRevokeClose,
  devicePerformRevoke,
  fetchDevices
} from 'actions'

import { translate } from 'cozy-ui/react/I18n'

import Alerter from 'cozy-ui/react/Alerter'
import DevicesView from 'components/DevicesView'

const mapStateToProps = state => ({
  devices: state.devices,
  isFetching: state.ui.isFetching,
  openDeviceRevokeModale: state.openDeviceRevokeModale,
  deviceToRevoke: state.deviceToRevoke
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchDevices: () => {
    const { t } = ownProps
    return dispatch(fetchDevices()).catch(() =>
      Alerter.error(t('DevicesView.load_error'))
    )
  },
  onDeviceModaleRevoke: device => {
    dispatch(deviceModaleRevokeOpen(device))
  },
  onDeviceModaleRevokeClose: () => {
    dispatch(deviceModaleRevokeClose())
  },
  devicePerformRevoke: deviceId => {
    const { t } = ownProps
    dispatch(devicePerformRevoke(deviceId)).catch(() =>
      Alerter.error(t('revokeDevice.error'))
    )
  }
})

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DevicesView)
)
