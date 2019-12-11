import { connect } from 'react-redux'
import get from 'lodash/get'
import compose from 'lodash/flowRight'
import Alerter from 'cozy-ui/react/Alerter'
import { translate } from 'cozy-ui/react/I18n'
import { AUTH_MODE } from 'actions/twoFactor'
import {
  updatePassphrase,
  updatePassphrase2FAFirst,
  updatePassphrase2FASecond,
  updateHint
} from 'actions/passphrase'
import { fetchInfos } from 'actions'
import PassphraseView from 'components/PassphraseView'

const mapStateToProps = state => ({
  fields: state.fields,
  isTwoFactorEnabled:
    get(state, 'fields.auth_mode.value') === AUTH_MODE.TWO_FA_MAIL,
  instance: state.instance,
  passphrase: state.passphrase
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPassphraseSimpleSubmit: (currentPassphrase, newPassphrase, hint) => {
    return (
      dispatch(updateHint(hint))
        .then(() =>
          dispatch(updatePassphrase(currentPassphrase, newPassphrase))
        )
        .then(() => Alerter.info(ownProps.t('PassphraseView.reload')))
        // eslint-disable-next-line no-console
        .catch(e => console.error(e))
    )
  },
  onPassphrase2FAStep1: current => {
    return dispatch(updatePassphrase2FAFirst(current)).catch(e =>
      // eslint-disable-next-line no-console
      console.error(e)
    )
  },
  onPassphrase2FAStep2: (
    current,
    newVal,
    twoFactorCode,
    twoFactorToken,
    hint
  ) => {
    return (
      dispatch(updateHint(hint))
        .then(() =>
          dispatch(
            updatePassphrase2FASecond(
              current,
              newVal,
              twoFactorCode,
              twoFactorToken
            )
          )
        )
        .then(() => Alerter.info(ownProps.t('PassphraseView.reload')))
        // eslint-disable-next-line no-console
        .catch(e => console.error(e))
    )
  },
  fetchInfos: () => dispatch(fetchInfos())
})

const Password = compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PassphraseView)

export default Password
