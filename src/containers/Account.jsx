import { connect } from 'react-redux'

import { updateInfo } from '../actions'

import AccountView from '../components/AccountView'

const mapStateToProps = (state, ownProps) => ({
  fields: state.fields
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFieldChange: (field, value) => {
    dispatch(updateInfo(field, value))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountView)
