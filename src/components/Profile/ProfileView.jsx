import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Stack from 'cozy-ui/transpiled/react/Stack'

import Page from '@/components/Page'
import PageTitle from '@/components/PageTitle'

import { DeleteSection } from '@/components/Profile/DeleteSection'
import LanguageSection from '@/components/Profile/LanguageSection'
import DefaultRedirectionSection from '@/components/Profile/DefaultRedirectionSection'
import TwoFA from '@/components/2FA'
import Import from '@/components/Profile/Import'
import { ExportSection } from '@/components/export/ExportSection'
import TrackingSection from '@/components/Profile/TrackingSection'
import PasswordSection from '@/components/Profile/PasswordSection'
import EmailSection from '@/components/Email/EmailSection'
import { PublicNameSection } from '@/components/Profile/PublicNameSection'
import { PhoneNumberSection } from '@/components/Profile/PhoneNumberSection'
import { hasQueryBeenLoaded, useQuery } from 'cozy-client'
import { buildSettingsInstanceQuery } from '@/lib/queries'

const ProfileView = ({
  exportData,
  fetchExportData,
  requestExport,
  importData,
  precheckImport,
  submitImport
}) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { exportId } = useParams()

  const instanceQuery = buildSettingsInstanceQuery()
  const instanceResult = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  return (
    <Page narrow>
      <PageTitle className={!isMobile ? 'u-mb-1' : ''}>
        {t('ProfileView.title')}
      </PageTitle>
      {hasQueryBeenLoaded(instanceResult) ? (
        <>
          <Stack spacing="l">
            <EmailSection />
            <PublicNameSection />
            <PhoneNumberSection />
            <PasswordSection />
            <TwoFA />
            <LanguageSection />
            <DefaultRedirectionSection />
            <TrackingSection />
            <div>
              <ExportSection
                email={instanceResult.data.email}
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
          <DeleteSection />
        </>
      ) : (
        <Spinner
          className="u-pos-fixed-s"
          middle
          size="xxlarge"
          loadingType="loading"
        />
      )}
      <Outlet />
    </Page>
  )
}

export default ProfileView
