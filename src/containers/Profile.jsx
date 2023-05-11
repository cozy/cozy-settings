import { connect } from 'react-redux'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import { updateInfo, fetchInfos } from 'actions'
import { requestExport, fetchExportData } from 'actions/export'
import { precheckImport, submitImport } from 'actions/import'

import ProfileView from 'components/ProfileView'

const mapStateToProps = state => ({
  fields: state.fields,
  passphrase: state.passphrase,
  instance: state.instance,
  exportData: state.exportData,
  importData: state.importData,
  isFetching: state.ui.isFetching
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchInfos: () => dispatch(fetchInfos()),
  onFieldChange: (field, value) => {
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
  precheckImport: async url => {
    return dispatch(precheckImport(url))
  },
  submitImport: async url => {
    return dispatch(submitImport(url))
  }
})

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(ProfileView)
)
