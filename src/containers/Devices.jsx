import { connect } from 'react-redux'

import DevicesView from '../components/DevicesView'

const mapStateToProps = (state, ownProps) => ({
  devices: state.devices,
  isFetching: state.ui.isFetching
})

export default connect(
  mapStateToProps
)(DevicesView)
