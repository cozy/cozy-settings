import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Stack from 'cozy-ui/transpiled/react/Stack'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'

import DeleteAccount from 'components/Profile/DeleteAccount'
import LanguageSection from 'components/Profile/LanguageSection'
import DefaultRedirectionSection from 'components/Profile/DefaultRedirectionSection'
import TwoFA from 'components/2FA'
import Import from 'components/Profile/Import'
import ExportSection from 'components/export/ExportSection'
import TrackingSection from 'components/Profile/TrackingSection'
import PasswordSection from 'components/Profile/PasswordSection'
import EmailSection from 'components/Email/EmailSection'
import { PublicNameSection } from 'components/Profile/PublicNameSection'

const ProfileView = ({
  fields,
  isFetching,
  onFieldChange,
  instance,
  exportData,
  fetchExportData,
  requestExport,
  importData,
  precheckImport,
  submitImport,
  fetchInfos
}) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { exportId } = useParams()

  useEffect(() => {
    fetchInfos()
    // eslint-disable-next-line
  }, [])

  return (
    <Page narrow>
      {isFetching && (
        <Spinner
          className="u-pos-fixed-s"
          middle
          size="xxlarge"
          loadingType="loading"
        />
      )}
      {!isFetching && instance && (
        <>
          <PageTitle className={!isMobile ? 'u-mb-1' : ''}>
            {t('ProfileView.title')}
          </PageTitle>
          <Stack spacing="l">
            <EmailSection />
            <PublicNameSection />
            <PasswordSection />
            <TwoFA />
            <LanguageSection />
            <DefaultRedirectionSection
              fields={fields}
              onChange={onFieldChange}
            />
            <TrackingSection />
            <div>
              <ExportSection
                email={fields.email && fields.email.value}
                exportData={exportData}
                exportId={exportId}
                requestExport={requestExport}
                fetchExportData={() => fetchExportData(exportId)}
                parent="/profile"
              />
              <Import
                importData={importData}
                precheckImport={precheckImport}
                submitImport={submitImport}
              />
            </div>
          </Stack>
          <DeleteAccount />
        </>
      )}
      <Outlet />
    </Page>
  )
}

export default ProfileView
