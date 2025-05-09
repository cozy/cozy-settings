import { connect } from 'react-redux'

import { translate } from 'cozy-ui/transpiled/react/providers/I18n'

import { DevicesView } from '@/components/Devices/DevicesView'

const mapStateToProps = state => ({
  openDeviceRevokeModale: state.openDeviceRevokeModale,
  deviceToRevoke: state.deviceToRevoke
})

const mapDispatchToProps = () => ({})

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(DevicesView)
)
