import { connect } from 'react-redux'

import ServicesView from '../components/ServicesView'

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.ui.isFetching
})

export default connect(
  mapStateToProps
)(ServicesView)
