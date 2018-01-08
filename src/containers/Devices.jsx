import { connect } from 'react-redux'

import { deviceModaleRevokeOpen, deviceModaleRevokeClose, devicePerformRevoke, fetchDevices } from '../actions'

import DevicesView from '../components/DevicesView'

const mapStateToProps = (state, ownProps) => ({
  devices: state.devices,
  isFetching: state.ui.isFetching,
  openDeviceRevokeModale: state.openDeviceRevokeModale,
  deviceToRevoke: state.deviceToRevoke
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchDevices: () => dispatch(fetchDevices()),
  onDeviceModaleRevoke: (device) => {
    dispatch(deviceModaleRevokeOpen(device))
  },
  onDeviceModaleRevokeClose: () => {
    dispatch(deviceModaleRevokeClose())
  },
  devicePerformRevoke: (deviceId) => {
    dispatch(devicePerformRevoke(deviceId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevicesView)
