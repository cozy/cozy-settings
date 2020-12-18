import compose from 'lodash/flowRight'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { withClient } from 'cozy-client'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import ButtonAction from 'cozy-ui/transpiled/react/ButtonAction'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import formStyles from 'styles/fields.styl'

import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'

class ExportDownload extends Component {
  componentDidMount() {
    this.props.fetchExportData()
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
      <Dialog
        open
        onClose={() => this.closeModal()}
        title={t('ProfileView.export.download.title')}
        content={
          exportData.isFetching ? (
            <Spinner size="xlarge" />
          ) : (
            <div>
              <iframe
                style={{ display: 'none' }}
                ref={frame => {
                  this.downloadFrame = frame
                }}
              />
              {exportData.error ? (
                <p className={formStyles['coz-form-errors']}>
                  {t(exportData.error)}
                </p>
              ) : (
                <div>
                  {t('ProfileView.export.download.description')}
                  <ButtonAction
                    label={firstElementName}
                    rightIcon="download"
                    onClick={() => this.download()}
                  />
                  {cursors &&
                    cursors.length &&
                    cursors.map((cursor, index) => {
                      return (
                        <ButtonAction
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
            </div>
          )
        }
      />
    )
  }
}

export default compose(
  withClient,
  translate(),
  withRouter
)(ExportDownload)
