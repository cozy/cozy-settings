import { connect } from 'react-redux'

import { updateInfo, updatePassphrase, fetchInfos } from '../actions'

import ProfileView from '../components/ProfileView'

const mapStateToProps = (state, ownProps) => ({
  fields: state.fields,
  passphrase: state.passphrase,
  instance: state.instance
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchInfos: () => dispatch(fetchInfos()),
  onFieldChange: (field, value) => {
    dispatch(updateInfo(field, value))
  },
  updateInfo: (field, value) => {
    dispatch(updateInfo(field, value))
  },
  onPassphraseSubmit: (current, newVal) => {
    return dispatch(updatePassphrase(current, newVal))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView)
