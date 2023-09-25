import React, { Component } from 'react'
import { STACK_DOMAIN } from 'actions'

import { translate } from 'cozy-ui/transpiled/react/providers/I18n'
import { Button } from 'cozy-ui/transpiled/react/deprecated/Button'
import Typography from 'cozy-ui/transpiled/react/Typography'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import ExportDownload from 'components/export/ExportDownload'

import { IllustrationDialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import flag from 'cozy-flags'

const exportImage = require('assets/images/export-cozy-mail.svg')

class ExportSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayModal: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.submitExport = this.submitExport.bind(this)
  }

  toggleModal() {
    this.setState(currentState => ({
      displayModal: !currentState.displayModal
    }))
  }

  submitExport() {
    this.props.requestExport()
    this.toggleModal()
  }

  render() {
    const { t, email, exportData, exportId, fetchExportData, parent } =
      this.props
    const { displayModal } = this.state
    return (
      <div>
        <div>
          <Typography variant="h5" gutterBottom>
            {t('ProfileView.export.title')}
          </Typography>
          {flag('settings.moving-cozy') && (
            <div className="u-mv-half">
              <form
                action={STACK_DOMAIN + '/move/initialize'}
                method="post"
                target="_blank"
              >
                <Button label={t('ProfileView.move.button')} extension="full" />
              </form>
            </div>
          )}
          <Typography variant="body1" gutterBottom>
            {t('ProfileView.export.label')}
          </Typography>
          <div className="u-mb-half">
            <Button
              onClick={this.toggleModal}
              label={t('ProfileView.export.link')}
              extension="full"
            />
          </div>
        </div>
        {displayModal && (
          <IllustrationDialog
            open
            onClose={() => this.toggleModal()}
            title={
              <div className="u-flex u-flex-column u-flex-items-center">
                <img
                  className="u-maw-4 u-mb-1"
                  alt={t('ProfileView.export.modal.title')}
                  src={exportImage}
                />
                {t('ProfileView.export.modal.title')}
              </div>
            }
            content={
              <>
                <ReactMarkdownWrapper
                  source={t('ProfileView.export.modal.description', { email })}
                />
                {exportData.error && (
                  <Typography variant="body1" className="u-error">
                    {t(exportData.error)}
                  </Typography>
                )}
              </>
            }
            actions={
              <>
                <Button
                  className="u-flex-grow-1"
                  theme="secondary"
                  onClick={this.toggleModal}
                  label={t('ProfileView.export.modal.cancel')}
                />
                <Button
                  className="u-flex-grow-1"
                  theme="primary"
                  onClick={this.submitExport}
                  busy={exportData.submitting}
                  disabled={exportData.submitting}
                  label={t('ProfileView.export.modal.CTA')}
                />
              </>
            }
          />
        )}
        {exportId && (
          <ExportDownload
            exportData={exportData}
            exportId={exportId}
            fetchExportData={fetchExportData}
            parent={parent}
          />
        )}
      </div>
    )
  }
}

export default translate()(ExportSection)
