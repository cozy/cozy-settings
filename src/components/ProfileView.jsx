import viewStyles from 'styles/view'

import classNames from 'classnames'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Text } from 'cozy-ui/transpiled/react/Text'
import Button from 'cozy-ui/transpiled/react/Button'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import DeleteAccount from 'components/DeleteAccount'
import Input from 'components/Input'
import LanguageSection from 'components/LanguageSection'
import TwoFA from 'components/2FA'
import Import from 'components/Import'
import ExportSection from 'components/export/ExportSection'
import TrackingSection from 'components/TrackingSection'

import { AUTH_MODE } from 'actions/twoFactor'

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
      cancel2FAActivation
    } = this.props

    let exportId = null
    if (match && match.params) {
      exportId = match.params.exportId
    }
    const isTwoFactorEnabled =
      fields.auth_mode && fields.auth_mode.value === AUTH_MODE.TWO_FA_MAIL

    return (
      <div role="contentinfo">
        <div
          className={classNames(
            viewStyles['set-view-content'],
            viewStyles['set-view-content--narrow']
          )}
        >
          {isFetching && (
            <Spinner
              className={'u-pos-fixed-s'}
              middle
              size="xxlarge"
              loadingType={t('Loading.loading')}
            />
          )}
          {!isFetching && (
            <>
              <h2 className={viewStyles['set-view-title']}>
                {t('ProfileView.title')}
              </h2>
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
              <h3>{t('ProfileView.password.title')}</h3>
              <Text tag="p" className="u-black">
                {t('ProfileView.password.label')}
              </Text>
              <Button
                tag={Link}
                to="/profile/password"
                label={t('ProfileView.password.cta')}
                theme="secondary"
                className="u-mh-0"
              />
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
              <div className={viewStyles['set-delete-account']}>
                <DeleteAccount />
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default translate()(ProfileView)
