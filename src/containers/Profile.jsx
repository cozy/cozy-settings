import { connect } from 'react-redux'

import { updateInfo, updatePassphrase, passphraseForgot, modalClose } from '../actions'

import ProfileView from '../components/ProfileView'

const mapStateToProps = (state, ownProps) => ({
  fields: state.fields,
  passphrase: state.passphrase
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFieldChange: (field, value) => {
    dispatch(updateInfo(field, value))
  },
  onPassphraseSubmit: (current, newVal) => {
    return dispatch(updatePassphrase(current, newVal))
  },
  onPasswordForgot: () => {
    return dispatch(passphraseForgot())
  },
  onModalClose: () => {
    return dispatch(modalClose())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView)
