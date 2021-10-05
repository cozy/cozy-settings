import { connect } from 'react-redux'

import {
  deviceModaleRevokeOpen,
  deviceModaleRevokeClose,
  devicePerformRevoke
} from 'actions'

import { translate } from 'cozy-ui/transpiled/react/I18n'

import Alerter from 'cozy-ui/transpiled/react/Alerter'
import DevicesView from 'components/DevicesView'

const mapStateToProps = state => ({
  openDeviceRevokeModale: state.openDeviceRevokeModale,
  deviceToRevoke: state.deviceToRevoke
})

const mapDispatchToProps = (dispatch, ownProps) => ({
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
