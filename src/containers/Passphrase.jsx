import { connect } from 'react-redux'
import get from 'lodash/get'
import compose from 'lodash/flowRight'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { AUTH_MODE } from 'actions/twoFactor'
import {
  updatePassphrase,
  updatePassphrase2FAFirst,
  updatePassphrase2FASecond,
  updateHint
} from 'actions/passphrase'
import { fetchInfos } from 'actions'
import PassphraseView from 'components/PassphraseView'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  fields: state.fields,
  isTwoFactorEnabled:
    get(state, 'fields.auth_mode.value') === AUTH_MODE.TWO_FA_MAIL,
  instance: state.instance,
  passphrase: state.passphrase
})

export const parseRedirectUrlsFromUrlParams = urlParamsStr => {
  const urlParams = new URLSearchParams(urlParamsStr)

  return {
    successRedirectUrl: urlParams.get('redirect_success'),
    cancelRedirectUrl: urlParams.get('redirect_cancel')
  }
}

const showSuccessThenReload = (t, location) => {
  const { successRedirectUrl } = parseRedirectUrlsFromUrlParams(location.search)

  const translatationKey = successRedirectUrl
    ? 'PassphraseView.redirect'
    : 'PassphraseView.reload'

  const ALERT_DURATION = 4000
  Alerter.info(t(translatationKey), { duration: ALERT_DURATION })

  setTimeout(() => {
    if (successRedirectUrl) {
      window.location = successRedirectUrl
    } else {
      // the token changes after a password change, so we need to reload
      // the page to get the new one
      window.location.reload()
    }
  }, ALERT_DURATION)
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPassphraseSimpleSubmit: async (currentPassphrase, newPassphrase, hint) => {
    try {
      await dispatch(updateHint(hint))
      await dispatch(updatePassphrase(currentPassphrase, newPassphrase))
      showSuccessThenReload(ownProps.t, ownProps.location)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  onPassphrase2FAStep1: async currentPassphrase => {
    try {
      await dispatch(updatePassphrase2FAFirst(currentPassphrase))
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
      await dispatch(updateHint(hint))
      await dispatch(
        updatePassphrase2FASecond(
          currentPassphrase,
          newPassphrase,
          twoFactorCode,
          twoFactorToken
        )
      )
      showSuccessThenReload(ownProps.t, ownProps.location)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  fetchInfos: () => dispatch(fetchInfos())
})

const Passphrase = compose(
  withRouter,
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(PassphraseView)

export default Passphrase
