import React, { Component } from 'react'

import { translate } from 'cozy-ui/react/I18n'
import Modal, { ModalHeader, ModalDescription, ModalFooter } from 'cozy-ui/react/Modal'
import { Button } from 'cozy-ui/react/Button'

import viewStyles from '../../styles/view'
import formStyles from '../../styles/fields'
import ReactMarkdownWrapper from '../ReactMarkdownWrapper'
import ExportDownload from './ExportDownload'

const exportImage = require('../../assets/images/export-cozy-mail.svg')

class ExportSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayModal: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.submitExport = this.submitExport.bind(this)
  }

  toggleModal () {
    this.setState(currentState => ({
      displayModal: !currentState.displayModal
    }))
  }

  submitExport () {
    this.props.requestExport()
    this.toggleModal()
  }

  render () {
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
        <p className={viewStyles['set-view-section']}>
          <h3>{t('ProfileView.export.title')}</h3>
          <p className={viewStyles['set-view-section-label']}>
            {t('ProfileView.export.label')}
          </p>
          <a
            className={viewStyles['set-view-section-link']}
            onClick={this.toggleModal}
          >
            {t('ProfileView.export.link')}
          </a>
        </p>
        {displayModal &&
          <Modal
            className={viewStyles['set-export-modal']}
            secondaryAction={this.toggleModal}
            mobileFullscreen
          >
            <ModalHeader className={viewStyles['set-export-modal-header']}>
              <img
                className={viewStyles['set-export-modal-image']}
                alt={t('ProfileView.export.modal.title')}
                src={exportImage}
              />
              <h2 className={viewStyles['set-export-modal-title']}>
                {t('ProfileView.export.modal.title')}
              </h2>
            </ModalHeader>
            <ModalDescription className={viewStyles['set-export-modal-description']}>
              <ReactMarkdownWrapper
                source={t(
                  'ProfileView.export.modal.description',
                  { email }
                )}
              />
              {exportData.error && <p className={formStyles['coz-form-errors']}>
                  {t(exportData.error)}
                </p>
              }
            </ModalDescription>
            <ModalFooter className={viewStyles['set-export-modal-footer']}>
              <Button
                theme='secondary'
                onClick={this.toggleModal}
              >
                {t('ProfileView.export.modal.cancel')}
              </Button>
              <Button
                theme='primary'
                onClick={this.submitExport}
                busy={exportData.submitting}
                disabled={exportData.submitting}
              >
                {t('ProfileView.export.modal.CTA')}
              </Button>
            </ModalFooter>
          </Modal>
        }
        {exportId &&
          <ExportDownload
            exportData={exportData}
            exportId={exportId}
            fetchExportData={fetchExportData}
            parent={parent}
          />
        }
      </div>
    )
  }
}

export default translate()(ExportSection)
