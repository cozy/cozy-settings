/* global cozy */

import React, { Component } from 'react'

import { translate } from 'cozy-ui/react/I18n'
import ButtonAction from 'cozy-ui/react/ButtonAction'
import Modal, { ModalHeader, ModalDescription } from 'cozy-ui/react/Modal'
import viewStyles from '../../styles/view'

class ExportDownload extends Component {
  constructor (props) {
    super(props)
    props.fetchExportData()
  }

  download (cursor) {
    const { exportId } = this.props
    const dataUrl = `${cozy.client._url}/move/exports/data/${exportId}`
    const url = cursor
      ? `${dataUrl}?cursor=${cursor}`
      : dataUrl
    this.downloadFrame.src = url
  }

  render () {
    const { t, exportData } = this.props
    const exportDoc =
      exportData && exportData.data && exportData.data.attributes
    const cursors = exportDoc && exportDoc.parts_cursors
    const firstElementName =
      cursors && cursors.length
        ? t('ProfileView.export.download.CTA_part', { number: 0 })
        : t('ProfileView.export.download.CTA')

    return (
      <Modal className={viewStyles['set-export-modal']} mobileFullscreen>
        <iframe
          style={{ display: 'none' }}
          ref={frame => { this.downloadFrame = frame }}
        />
        <ModalHeader className={viewStyles['set-export-modal-header']}>
          <h2 className={viewStyles['set-export-modal-title']}>
            {t('ProfileView.export.download.title')}
          </h2>
        </ModalHeader>
        <ModalDescription>
          {t('ProfileView.export.download.description')}
          <ButtonAction
            className={viewStyles['set-export-modal-action']}
            label={firstElementName}
            rightIcon='download'
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
                  rightIcon='download'
                  onClick={() => this.download(cursor)}
                />
              )
            })}
        </ModalDescription>
      </Modal>
    )
  }
}

export default translate()(ExportDownload)
