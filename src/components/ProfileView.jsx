import viewStyles from 'styles/view'

import classNames from 'classnames'
import React, { Component } from 'react'

import { translate } from 'cozy-ui/react/I18n'

import DeleteAccount from 'components/DeleteAccount'
import Input from 'components/Input'
import PassphraseForm from 'components/PassphraseForm'
import LanguageSection from 'components/LanguageSection'
import TwoFA from 'components/2FA'
import ExportSection from 'components/export/ExportSection'
import TrackingSection from 'components/TrackingSection'
import Passphrase2FA from 'components/2FA/Passphrase2FA'

import { AUTH_MODE } from 'actions/twoFactor'

class ProfileView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      twoFAPassphraseModalIsOpen: false
    }

    this.onPassphrase2FAStep1 = this.onPassphrase2FAStep1.bind(this)
    this.onPassphrase2FASubmit = this.onPassphrase2FASubmit.bind(this)
    this.closeTwoFAPassphraseModal = this.closeTwoFAPassphraseModal.bind(this)
  }

  componentWillMount() {
    this.props.fetchInfos()
  }

  onPassphrase2FAStep1(current, newVal) {
    this.setState(() => ({
      twoFAPassphraseModalIsOpen: true,
      currentPassphrase: current,
      new2FAPassphrase: newVal
    }))
    this.props.onPassphrase2FAStep1(current)
  }

  onPassphrase2FASubmit(twoFactorCode) {
    const { onPassphrase2FAStep2, passphrase } = this.props
    const { twoFactorToken } = passphrase
    const { currentPassphrase, new2FAPassphrase } = this.state
    onPassphrase2FAStep2(
      currentPassphrase,
      new2FAPassphrase,
      twoFactorCode,
      twoFactorToken
    ).then(() => {
      this.closeTwoFAPassphraseModal()
    })
  }

  closeTwoFAPassphraseModal() {
    this.setState(() => ({
      twoFAPassphraseModalIsOpen: false,
      new2FAPassphrase: null
    }))
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
      cancel2FAActivation
    } = this.props

    const { twoFAPassphraseModalIsOpen } = this.state

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
          <PassphraseForm
            {...passphrase}
            onSubmit={
              isTwoFactorEnabled
                ? this.onPassphrase2FAStep1
                : onPassphraseSimpleSubmit
            }
            isTwoFactorEnabled={isTwoFactorEnabled}
          />
          {twoFAPassphraseModalIsOpen &&
            !passphrase.errors &&
            !passphrase.submitting && (
              <Passphrase2FA
                onPassphrase2FASubmit={this.onPassphrase2FASubmit}
                closeTwoFAPassphraseModal={this.closeTwoFAPassphraseModal}
                instance={instance}
                submitting={passphrase.submitting2FAStep2}
              />
            )}
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
          <div className={viewStyles['set-delete-account']}>
            <DeleteAccount />
          </div>
        </div>
      </div>
    )
  }
}

export default translate()(ProfileView)
