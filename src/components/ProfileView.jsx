import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import compose from 'lodash/flowRight'
import get from 'lodash/get'

import { useClient } from 'cozy-client'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Button'
import withBreakpoints from 'cozy-ui/transpiled/react/helpers/withBreakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Stack from 'cozy-ui/transpiled/react/Stack'

import Page from 'components/Page'
import DeleteAccount from 'components/DeleteAccount'
import Input from 'components/Input'
import LanguageSection from 'components/LanguageSection'
import TwoFA from 'components/2FA'
import Import from 'components/Import'
import ExportSection from 'components/export/ExportSection'
import TrackingSection from 'components/TrackingSection'
import PageTitle from 'components/PageTitle'

import { AUTH_MODE } from 'actions/twoFactor'

export const PasswordSection = () => {
  const { t } = useI18n()
  const client = useClient()

  // If we have no capabilities, consider that we can login to the cozy with password
  const canAuthWithPassword = get(
    client,
    'capabilities.can_auth_with_password',
    true
  )

  return canAuthWithPassword ? (
    <div>
      <Typography variant="h5" gutterBottom>
        {t('ProfileView.password.title')}
      </Typography>
      <Typography variant="body1">{t('ProfileView.password.label')}</Typography>
      <Button
        tag={Link}
        to="/profile/password"
        label={t('ProfileView.password.cta')}
        theme="secondary"
        className="u-mt-half u-mh-0"
      />
    </div>
  ) : null
}

class ProfileView extends Component {
  componentWillMount() {
    this.props.fetchInfos()
  }

  render() {
    const {
      t,
      match,
      fields,
      isFetching,
      onFieldChange,
      instance,
      updateInfo,
      exportData,
      fetchExportData,
      requestExport,
      importData,
      precheckImport,
      submitImport,
      twoFactor,
      checkTwoFactorCode,
      activate2FA,
      desactivate2FA,
      cancel2FAActivation,
      breakpoints: { isMobile }
    } = this.props

    let exportId = null
    if (match && match.params) {
      exportId = match.params.exportId
    }
    const isTwoFactorEnabled =
      fields.auth_mode && fields.auth_mode.value === AUTH_MODE.TWO_FA_MAIL

    return (
      <Page narrow>
        {isFetching && (
          <Spinner
            className={'u-pos-fixed-s'}
            middle
            size="xxlarge"
            loadingType="loading"
          />
        )}
        {!isFetching && (
          <>
            <PageTitle className={!isMobile ? 'u-mb-1' : ''}>
              {t('ProfileView.title')}
            </PageTitle>
            <Stack spacing="l">
              <Input
                name="email"
                type="email"
                title={t('ProfileView.email.title')}
                label={t('ProfileView.email.label')}
                {...fields.email}
                onBlur={onFieldChange}
              />
              <Input
                name="public_name"
                type="text"
                title={t('ProfileView.public_name.title')}
                label={t(`ProfileView.public_name.label`)}
                {...fields.public_name}
                onBlur={onFieldChange}
              />
              <PasswordSection />
              <TwoFA
                isTwoFactorEnabled={isTwoFactorEnabled}
                instance={instance}
                checkTwoFactorCode={checkTwoFactorCode}
                twoFactor={twoFactor}
                activate2FA={activate2FA}
                desactivate2FA={desactivate2FA}
                cancel2FAActivation={cancel2FAActivation}
                updateInfo={updateInfo}
              />
              <LanguageSection fields={fields} onChange={onFieldChange} />
              <TrackingSection
                instance={instance}
                fields={fields}
                onChange={onFieldChange}
              />
              <div>
                <ExportSection
                  email={fields.email && fields.email.value}
                  exportData={exportData}
                  exportId={exportId}
                  requestExport={requestExport}
                  fetchExportData={() => fetchExportData(exportId)}
                  parent={'/profile'}
                />
                <Import
                  importData={importData}
                  precheckImport={precheckImport}
                  submitImport={submitImport}
                />
              </div>
            </Stack>
            <div className="u-mt-2">
              <DeleteAccount />
            </div>
          </>
        )}
      </Page>
    )
  }
}

export default compose(
  translate(),
  withBreakpoints()
)(ProfileView)
