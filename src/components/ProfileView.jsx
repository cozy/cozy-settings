import viewStyles from '../styles/view'

import classNames from 'classnames'
import React, { Component } from 'react'

import { translate } from 'cozy-ui/react/I18n'

import DeleteAccount from './DeleteAccount'
import Input from './Input'
import PassphraseForm from './PassphraseForm'
import LanguageSection from './LanguageSection'
import TwoFA from './2FA'
import ExportSection from './export/ExportSection'
import TrackingSection from './TrackingSection'

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
      passphrase,
      isFetching,
      onFieldChange,
      onPassphraseSimpleSubmit,
      instance,
      updateInfo,
      exportData,
      fetchExportData,
      requestExport,
      twoFactor,
      checkTwoFactorCode,
      activate2FA,
      desactivate2FA,
      cancel2FAActivation,
      onPassphrase2FAStep1,
      onPassphrase2FAStep2
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
          {isFetching && <p>Loading...</p>}
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
          {!isTwoFactorEnabled && (
            <PassphraseForm
              {...passphrase}
              onSubmit={onPassphraseSimpleSubmit}
            />
          )}
          <TwoFA
            isTwoFactorEnabled={isTwoFactorEnabled}
            passphrase={passphrase}
            instance={instance}
            checkTwoFactorCode={checkTwoFactorCode}
            twoFactor={twoFactor}
            activate2FA={activate2FA}
            desactivate2FA={desactivate2FA}
            cancel2FAActivation={cancel2FAActivation}
            onPassphrase2FAStep1={onPassphrase2FAStep1}
            onPassphrase2FAStep2={onPassphrase2FAStep2}
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
          <p className={viewStyles['set-delete-account']}>
            <DeleteAccount />
          </p>
        </div>
      </div>
    )
  }
}

export default translate()(ProfileView)
