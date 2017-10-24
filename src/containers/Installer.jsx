import { connect } from 'react-redux'

import InstallerView from '../components/InstallerView'
import { installApp } from '../actions'

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (slug, appUrl, isUpdate) => dispatch(installApp(slug, appUrl, isUpdate))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallerView)
