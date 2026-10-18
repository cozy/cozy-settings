import { Download, Icon } from '@linagora/twake-icons'
import compose from 'lodash/flowRight'
import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import { translate } from 'twake-i18n'

import { withClient } from 'cozy-client'
import Buttons from 'cozy-ui/transpiled/react/Buttons'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'

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
    const { navigate, parent } = this.props
    navigate(parent)
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
                <Typography variant="body1" className="u-error">
                  {t(exportData.error)}
                </Typography>
              ) : (
                <div>
                  {t('ProfileView.export.download.description')}
                  <Buttons
                    label={firstElementName}
                    endIcon={<Icon icon={Download} />}
                    onClick={() => this.download()}
                  />
                  {cursors && cursors.length
                    ? cursors.map((cursor, index) => {
                        return (
                          <Buttons
                            label={t('ProfileView.export.download.CTA_part', {
                              number: index + 1
                            })}
                            endIcon={<Icon icon={Download} />}
                            onClick={() => this.download(cursor)}
                            key={index}
                          />
                        )
                      })
                    : null}
                </div>
              )}
            </div>
          )
        }
      />
    )
  }
}

const ComposedExportDownload = compose(withClient, translate())(ExportDownload)

const ExportDownloadWithHistory = props => {
  const navigate = useNavigate()
  return <ComposedExportDownload {...props} navigate={navigate} />
}

export default ExportDownloadWithHistory
