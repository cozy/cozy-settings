import React, { Component } from 'react'
import { STACK_DOMAIN } from 'actions'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Button } from 'cozy-ui/transpiled/react/Button'

import viewStyles from 'styles/view.styl'
import formStyles from 'styles/fields.styl'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import ExportDownload from 'components/export/ExportDownload'

import { IllustrationDialog } from 'cozy-ui/transpiled/react/CozyDialogs'

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
    const {
      t,
      email,
      exportData,
      exportId,
      fetchExportData,
      parent
    } = this.props
    const { displayModal } = this.state
    return (
      <div>
        <div className="{viewStyles['set-view-section']} u-mb-1">
          <h3>{t('ProfileView.export.title')}</h3>
          <p className="u-mt-1">
            <form
              action={STACK_DOMAIN + '/move/initialize'}
              method="post"
              target="_blank"
            >
              <Button label={t('ProfileView.move.button')} extension="full" />
            </form>
          </p>
          <p className={viewStyles['set-view-section-label']}>
            {t('ProfileView.export.label')}
          </p>
          <p className="u-mt-1">
            <Button
              onClick={this.toggleModal}
              label={t('ProfileView.export.link')}
              extension="full"
            />
          </p>
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
                  <p className={formStyles['coz-form-errors']}>
                    {t(exportData.error)}
                  </p>
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
