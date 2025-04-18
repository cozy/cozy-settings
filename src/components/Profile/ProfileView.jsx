import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { hasQueryBeenLoaded, useQuery } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Stack from 'cozy-ui/transpiled/react/Stack'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import flag from 'cozy-flags'

import TwoFA from '@/components/2FA'
import EmailSection from '@/components/Email/EmailSection'
import Page from '@/components/Page'
import PageTitle from '@/components/PageTitle'
import DefaultRedirectionSection from '@/components/Profile/DefaultRedirectionSection'
import { DeleteSection } from '@/components/Profile/DeleteSection'
import Import from '@/components/Profile/Import'
import LanguageSection from '@/components/Profile/LanguageSection'
import PasswordSection from '@/components/Profile/PasswordSection'
import AvatarSection from '@/components/Profile/AvatarSection'
import { PhoneNumberSection } from '@/components/Profile/PhoneNumberSection'
import { PublicNameSection } from '@/components/Profile/PublicNameSection'
import TrackingSection from '@/components/Profile/TrackingSection'
import { ExportSection } from '@/components/export/ExportSection'
import { buildSettingsInstanceQuery } from '@/lib/queries'

import '../../styles/twakeProducts/profile.css'

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

  const isTwoFAEnabled = flag('settings.2fa.enabled')

  return (
    <Page narrow>
      <PageTitle className={!isMobile ? 'u-mb-1' : ''}>
        {t('ProfileView.title')}
      </PageTitle>
      {hasQueryBeenLoaded(instanceResult) ? (
        <>
          <Stack spacing="l">
            <AvatarSection />
            <EmailSection />
            <PublicNameSection />
            <PhoneNumberSection />
            <PasswordSection />
            {isTwoFAEnabled && <TwoFA />}
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
