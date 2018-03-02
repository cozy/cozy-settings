import { connect } from 'react-redux'

import { updateInfo, checkMailConfirmationCode, fetchInfos } from '../actions'

import {
  updatePassphrase,
  updatePassphrase2FAFirst,
  updatePassphrase2FASecond
 } from '../actions/passphrase'

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
  checkMailConfirmationCode: (field, value) => {
    dispatch(checkMailConfirmationCode(field, value))
  },
  onPassphraseSimpleSubmit: (current, newVal) => {
    return dispatch(updatePassphrase(current, newVal))
  },
  onPassphrase2FAStep1: (current) => {
    return dispatch(updatePassphrase2FAFirst(current))
  },
  onPassphrase2FAStep2: (newVal, twoFactorCode, twoFactorToken) => {
    return dispatch(updatePassphrase2FASecond(newVal, twoFactorCode, twoFactorToken))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView)
