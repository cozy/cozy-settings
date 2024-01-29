import React, { useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { Button } from 'cozy-ui/transpiled/react/deprecated/Button'
import Typography from 'cozy-ui/transpiled/react/Typography'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import ExportDownload from 'components/export/ExportDownload'

import { IllustrationDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { MoveButton } from 'components/export/MoveButton'

const exportImage = require('assets/images/export-cozy-mail.svg')

const ExportSection = ({
  email,
  exportData,
  exportId,
  fetchExportData,
  parent,
  requestExport
}) => {
  const { t } = useI18n()

  const [displayModal, setDisplayModal] = useState(false)

  const toggleModal = () => {
    setDisplayModal(!displayModal)
  }

  const submitExport = () => {
    requestExport()
    toggleModal()
  }

  return (
    <div>
      <div>
        <Typography variant="h5" gutterBottom>
          {t('ProfileView.export.title')}
        </Typography>
        <MoveButton />
        <Typography variant="body1" gutterBottom>
          {t('ProfileView.export.label')}
        </Typography>
        <div className="u-mb-half">
          <Button
            onClick={toggleModal}
            label={t('ProfileView.export.link')}
            extension="full"
          />
        </div>
      </div>
      {displayModal && (
        <IllustrationDialog
          open
          onClose={toggleModal}
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
                onClick={toggleModal}
                label={t('ProfileView.export.modal.cancel')}
              />
              <Button
                className="u-flex-grow-1"
                theme="primary"
                onClick={submitExport}
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

export { ExportSection }
