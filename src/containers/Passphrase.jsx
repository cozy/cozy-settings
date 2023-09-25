import React from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import compose from 'lodash/flowRight'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'
import { AUTH_MODE } from 'actions/twoFactor'
import {
  updatePassphrase,
  updatePassphrase2FAFirst,
  updatePassphrase2FASecond,
  updateHint
} from 'actions/passphrase'
import { fetchInfos } from 'actions'
import PassphraseView from 'components/PassphraseView'
import { useLocation } from 'react-router-dom'
import { withClient } from 'cozy-client'

const mapStateToProps = state => ({
  fields: state.fields,
  isTwoFactorEnabled:
    get(state, 'fields.auth_mode.value') === AUTH_MODE.TWO_FA_MAIL,
  instance: state.instance,
  passphrase: state.passphrase
})

const showSuccess = t => {
  Alerter.success(t('PassphraseView.success'))
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPassphraseSimpleSubmit: async (currentPassphrase, newPassphrase, hint) => {
    try {
      await dispatch(updateHint(ownProps.client, hint))
      await dispatch(
        updatePassphrase(
          ownProps.client,
          currentPassphrase,
          newPassphrase,
          ownProps.client.getStackClient().uri
        )
      )
      showSuccess(ownProps.t)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  onPassphrase2FAStep1: async currentPassphrase => {
    try {
      await dispatch(
        updatePassphrase2FAFirst(
          ownProps.client,
          currentPassphrase,
          ownProps.client.getStackClient().uri
        )
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  onPassphrase2FAStep2: async (
    currentPassphrase,
    newPassphrase,
    twoFactorCode,
    twoFactorToken,
    hint
  ) => {
    try {
      await dispatch(updateHint(ownProps.client, hint))
      await dispatch(
        updatePassphrase2FASecond(
          ownProps.client,
          currentPassphrase,
          newPassphrase,
          twoFactorCode,
          twoFactorToken,
          ownProps.client.getStackClient().uri
        )
      )
      showSuccess(ownProps.t)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  fetchInfos: () => dispatch(fetchInfos(ownProps.client))
})

const ComposedPassphrase = compose(
  translate(),
  withClient,
  connect(mapStateToProps, mapDispatchToProps)
)(PassphraseView)

const PassphraseWithLocation = props => {
  const location = useLocation()
  return <ComposedPassphrase {...props} location={location} />
}

export default PassphraseWithLocation
