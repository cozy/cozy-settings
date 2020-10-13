import compose from 'lodash/flowRight'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { withClient } from 'cozy-client'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import ButtonAction from 'cozy-ui/transpiled/react/ButtonAction'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Modal, {
  ModalHeader,
  ModalDescription
} from 'cozy-ui/transpiled/react/Modal'

import viewStyles from 'styles/view'
import formStyles from 'styles/fields'

class ExportDownload extends Component {
  componentDidMount(props) {
    props.fetchExportData()
  }

  download(cursor) {
    const { exportId, client } = this.props
    const dataUrl = `${client.stackClient.uri}/move/exports/data/${exportId}`
    const url = cursor ? `${dataUrl}?cursor=${cursor}` : dataUrl
    this.downloadFrame.src = url
  }

  closeModal() {
    const { history, parent } = this.props
    history.push(parent)
  }

  render() {
    const { t, exportData } = this.props
    const exportDoc =
      exportData && exportData.data && exportData.data.attributes
    const cursors = exportDoc && exportDoc.parts_cursors
    const firstElementName =
      cursors && cursors.length
        ? t('ProfileView.export.download.CTA_part', { number: 0 })
        : t('ProfileView.export.download.CTA')

    return (
      <Modal
        className={viewStyles['set-export-modal']}
        secondaryAction={() => this.closeModal()}
        mobileFullscreen
      >
        <ModalHeader className="u-ta-center">
          <h2 className={viewStyles['set-export-modal-title']}>
            {t('ProfileView.export.download.title')}
          </h2>
        </ModalHeader>
        {exportData.isFetching ? (
          <Spinner
            className={viewStyles['set-export-modal-spinner']}
            size="xlarge"
          />
        ) : (
          <div>
            <iframe
              style={{ display: 'none' }}
              ref={frame => {
                this.downloadFrame = frame
              }}
            />
            <ModalDescription>
              {exportData.error ? (
                <p className={formStyles['coz-form-errors']}>
                  {t(exportData.error)}
                </p>
              ) : (
                <div>
                  {t('ProfileView.export.download.description')}
                  <ButtonAction
                    className={viewStyles['set-export-modal-action']}
                    label={firstElementName}
                    rightIcon="download"
                    onClick={() => this.download()}
                  />
                  {cursors &&
                    cursors.length &&
                    cursors.map((cursor, index) => {
                      return (
                        <ButtonAction
                          className={viewStyles['set-export-modal-action']}
                          label={t('ProfileView.export.download.CTA_part', {
                            number: index + 1
                          })}
                          rightIcon="download"
                          onClick={() => this.download(cursor)}
                          key={index}
                        />
                      )
                    })}
                </div>
              )}
            </ModalDescription>
          </div>
        )}
      </Modal>
    )
  }
}

export default compose(
  withClient,  
  translate(),
  withRouter
)(ExportDownload)
