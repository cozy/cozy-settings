import { connect } from 'react-redux'
import compose from 'lodash/flowRight'

import { withClient } from 'cozy-client'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'

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
  fetchInfos: () => dispatch(fetchInfos(ownProps.client)),
  onFieldChange: (field, value) => {
    dispatch(updateInfo(ownProps.client, field, value))
  },
  requestExport: async () => {
    try {
      await dispatch(requestExport(ownProps.client))
      Alerter.success(ownProps.t('ProfileView.export.success'))
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  fetchExportData: exportId => {
    dispatch(fetchExportData(ownProps.client, exportId))
  },
  precheckImport: async url => {
    return dispatch(precheckImport(ownProps.client, url))
  },
  submitImport: async url => {
    return dispatch(submitImport(ownProps.client, url))
  }
})

export default compose(
  translate(),
  withClient,
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileView)
