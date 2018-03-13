import { connect } from 'react-redux'

import { updateInfo, fetchInfos } from '../actions'
import { checkTwoFactorCode, activate2FA, desactivate2FA, cancel2FAActivation } from '../actions/twoFactor'

import {
  updatePassphrase,
  updatePassphrase2FAFirst,
  updatePassphrase2FASecond
 } from '../actions/passphrase'

import ProfileView from '../components/ProfileView'

const mapStateToProps = (state, ownProps) => ({
  fields: state.fields,
  passphrase: state.passphrase,
  instance: state.instance,
  twoFactor: state.twoFactor
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchInfos: () => dispatch(fetchInfos()),
  onFieldChange: (field, value) => {
    dispatch(updateInfo(field, value))
  },
  updateInfo: (field, value) => {
    dispatch(updateInfo(field, value))
  },
  cancel2FAActivation: () => {
    dispatch(cancel2FAActivation())
  },
  checkTwoFactorCode: (value, mode) => {
    dispatch(checkTwoFactorCode(value, mode))
  },
  activate2FA: (mode) => {
    dispatch(activate2FA(mode))
  },
  desactivate2FA: (mode) => {
    dispatch(desactivate2FA(mode))
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
