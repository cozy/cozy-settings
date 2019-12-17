import { connect } from 'react-redux'

import { translate } from 'cozy-ui/react/I18n'
import Alerter from 'cozy-ui/react/Alerter'

import { updateInfo, fetchInfos } from 'actions'
import {
  checkTwoFactorCode,
  activate2FA,
  desactivate2FA,
  cancel2FAActivation
} from 'actions/twoFactor'
import { requestExport, fetchExportData } from 'actions/export'

import ProfileView from 'components/ProfileView'

const mapStateToProps = state => ({
  fields: state.fields,
  passphrase: state.passphrase,
  instance: state.instance,
  twoFactor: state.twoFactor,
  exportData: state.exportData,
  isFetching: state.ui.isFetching
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchInfos: () => dispatch(fetchInfos()),
  onFieldChange: (field, value) => {
    dispatch(updateInfo(field, value))
  },
  updateInfo: (field, value) => {
    dispatch(updateInfo(field, value))
  },
  requestExport: async () => {
    try {
      await dispatch(requestExport())
      Alerter.success(ownProps.t('ProfileView.export.success'))
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  fetchExportData: exportId => {
    dispatch(fetchExportData(exportId))
  },
  cancel2FAActivation: () => {
    dispatch(cancel2FAActivation())
  },
  checkTwoFactorCode: (value, mode) => {
    dispatch(checkTwoFactorCode(value, mode))
  },
  activate2FA: mode => {
    dispatch(activate2FA(mode))
  },
  desactivate2FA: mode => {
    dispatch(desactivate2FA(mode))
  }
})

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfileView)
)
