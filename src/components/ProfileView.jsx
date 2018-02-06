import viewStyles from '../styles/view'
import styles from '../styles/fields'

import classNames from 'classnames'
import React, { Component, Fragment } from 'react'

import { Button } from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'
import Modal, { ModalContent } from 'cozy-ui/react/Modal'

import Input from './Input'
import PassphraseForm from './PassphraseForm'
import ReactMarkdownWrapper from './ReactMarkdownWrapper'
import Select from './Select'

const LANG_OPTIONS = ['en', 'fr']
const twoFaModalBanner = require('../assets/images/double_authent_prez_banner.svg')
const twoFaModalProtect = require('../assets/images/protect_data_point.svg')
const twoFaModalSecu = require('../assets/images/niv_secu_point.svg')

class ProfileView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      twoFAActivationModalIsOpen: false,
      twoFADesactivationModalIsOpen: false,
      mailConfirmationCodeRequested: false,
      mailConfirmationCodeIsValid: false
    }
    this.activate2FA = this.activate2FA.bind(this)
    this.desactivate2FA = this.desactivate2FA.bind(this)
    this.checkMailConfirmationCode = this.checkMailConfirmationCode.bind(this)
    this.openTwoFAActivationModal = this.openTwoFAActivationModal.bind(this)
    this.closeTwoFAActivationModal = this.closeTwoFAActivationModal.bind(this)
    this.openTwoFADesactivationModal = this.openTwoFADesactivationModal.bind(this)
    this.closeTwoFADesactivationModal = this.closeTwoFADesactivationModal.bind(this)
  }
  componentWillMount () {
    this.props.fetchInfos()
  }
  componentWillReceiveProps (nextProps) {
    this.props.fields.two_fa.value !== '' && nextProps.fields.two_fa.value && this.setState({mailConfirmationCodeIsValid: true})
  }
  activate2FA () {
    // TODO: Open the password modal
    this.props.updateInfo('auth_mode', 'two_factor_mail')
    this.setState({mailConfirmationCodeRequested: true})
  }
  desactivate2FA () {
    // Reset all the info  state
    this.props.updateInfo('two_fa', null)
    this.props.updateInfo('auth_mode', 'basic')
    this.setState({
      mailConfirmationCodeRequested: false,
      mailConfirmationCodeIsValid: false
    })
    this.closeTwoFADesactivationModal()
  }
  checkMailConfirmationCode (code) {
    this.props.checkMailConfirmationCode('mail_confirmation_code', code)
  }
  openTwoFAActivationModal () {
    this.setState({twoFAActivationModalIsOpen: true})
  }
  closeTwoFAActivationModal () {
    this.setState({twoFAActivationModalIsOpen: false})
  }
  openTwoFADesactivationModal () {
    this.setState({twoFADesactivationModalIsOpen: true})
  }
  closeTwoFADesactivationModal () {
    this.setState({twoFADesactivationModalIsOpen: false})
  }
  render () {
    const root = document.querySelector('[role=application]')
    const data = root.dataset
    const cozyDomain = data.cozyDomain
    const { t, fields, passphrase, isFetching, onFieldChange, onPassphraseSubmit, instance } = this.props
    const { twoFAActivationModalIsOpen, twoFADesactivationModalIsOpen, mailConfirmationCodeRequested, mailConfirmationCodeIsValid } = this.state
    return (
      <div role='contentinfo'>
        <div className={classNames(viewStyles['set-view-content'], viewStyles['set-view-content--narrow'])}>
          { isFetching && <p>Loading...</p> }
          <h2 className={viewStyles['set-view-title']}>{t('ProfileView.title')}</h2>
          <Input
            name='email'
            type='email'
            label={t('ProfileView.email.title')}
            description={t('ProfileView.email.label')}
            {...fields.email}
            onChange={onFieldChange} />
          <Input
            name='public_name'
            type='text'
            label={t('ProfileView.public_name.title')}
            description={t(`ProfileView.public_name.label`)}
            {...fields.public_name}
            onChange={onFieldChange} />
          <PassphraseForm {...passphrase} onSubmit={onPassphraseSubmit} />
          <Input
            name='two_fa'
            type='checkbox'
            label={t('ProfileView.twofa.title.activate')}
            description={t('ProfileView.twofa.label', {link: 'https://support.cozy.io/article/114-doubleauthentification'})}
            {...fields.two_fa}
            onChange={fields.two_fa.value
              ? this.openTwoFADesactivationModal
              : this.openTwoFAActivationModal
            }
          />
          <Select
            name='locale'
            label={t('ProfileView.locale.title')}
            description={t(`ProfileView.locale.label`)}
            options={LANG_OPTIONS.map(lang => {
              return {
                value: lang,
                text: t(`ProfileView.locale.${lang}.text`)
              }
            })}
            {...fields.locale}
            onChange={onFieldChange} />
          <p>
            <ReactMarkdownWrapper
              source={
                t('ProfileView.locale.contrib', {link: 'https://support.cozy.io/article/114-doubleauthentification'})
              }
            />
          </p>
          <Input
            name='tracking'
            type='checkbox'
            label={t('ProfileView.tracking.title')}
            description={t('ProfileView.tracking.label')}
            {...fields.tracking}
            onChange={onFieldChange}
          />
          <a href={t('ProfileView.tos.version', {version: instance && instance.data.attributes.tos ? `-${instance.data.attributes.tos}` : '-201711'})} target='_blank'>
            {t('ProfileView.tos.link')}
          </a>
          {
            twoFAActivationModalIsOpen && <div className={viewStyles['set-view-content-twofa-modal-wrapper']}>
              <Modal
                dismissAction={() => this.closeTwoFAActivationModal()}
                className={viewStyles['set-view-content-twofa-modal']}
                title={
                  t(fields.two_fa.value && mailConfirmationCodeIsValid
                    ? 'ProfileView.twofa.title.validation'
                    : 'ProfileView.twofa.title.activate'
                  )
                }
              >
                <ModalContent
                  className={viewStyles['set-view-content-twofa-modal-content']}
                >
                  <Activate2FA
                    activate2FA={() => this.activate2FA()}
                    checkMailConfirmationCode={this.checkMailConfirmationCode}
                    mailConfirmationCodeRequested={mailConfirmationCodeRequested}
                    mailConfirmationCodeIsValid={mailConfirmationCodeIsValid}
                    closeTwoFAActivationModal={() => this.closeTwoFAActivationModal()}
                    instance={instance}
                    cozyDomain={cozyDomain}
                    fields={fields}
                    onChange={onFieldChange}
                  />
                </ModalContent>
              </Modal>
            </div>
          }
          {
            twoFADesactivationModalIsOpen && <div className={viewStyles['set-view-content-twofa-modal-wrapper']}>
              <Modal
                dismissAction={() => this.closeTwoFADesactivationModal()}
                className={viewStyles['set-view-content-twofa-modal']}
                title={t('ProfileView.twofa.title.desactivate')}
              >
                <ModalContent
                  className={viewStyles['set-view-content-twofa-modal-content']}
                >
                  <Desactivate2FA
                    desactivate2FA={() => this.desactivate2FA()}
                    closeTwoFADesactivationModal={() => this.closeTwoFADesactivationModal()}
                  />
                </ModalContent>
              </Modal>
            </div>
          }
        </div>
      </div>
    )
  }
}

const Activate2FA = translate()(({
  t,
  activate2FA,
  checkMailConfirmationCode,
  mailConfirmationCodeRequested,
  mailConfirmationCodeIsValid,
  closeTwoFAActivationModal,
  fields,
  onChange,
  instance,
  cozyDomain
}) => (
  mailConfirmationCodeRequested
  ? mailConfirmationCodeIsValid
    ? <ActivationConfirmed
      closeTwoFAActivationModal={closeTwoFAActivationModal}
      instance={instance}
      cozyDomain={cozyDomain}
      />
    : <MailConfirmationCode
      checkMailConfirmationCode={checkMailConfirmationCode}
      closeTwoFAActivationModal={closeTwoFAActivationModal}
      fields={fields}
      onChange={onChange}
      email={instance && instance.data.attributes.email}
    />
  : <ActivationConfirmation activate2FA={activate2FA} />
))

const ActivationConfirmation = translate()(({t, activate2FA}) => (
  <Fragment>
    <img
      alt={t('ProfileView.twofa.title.activate')}
      src={twoFaModalBanner}
    />
    <h3>{t('ProfileView.twofa.modal.protect')}</h3>
    <p>
      <ReactMarkdownWrapper
        source={
          t('ProfileView.twofa.modal.change', {link: 'https://support.cozy.io/article/114-doubleauthentification'})
        }
      />
    </p>
    <div className={viewStyles['set-view-content-twofa']}>
      <div className={viewStyles['set-view-content-twofa-point']}>
        <img className={viewStyles['set-view-content-twofa-point-image']} alt="{t('ProfileView.twofa.modal.secu_title')}" src={twoFaModalSecu} />
        <div>
          <b>{t('ProfileView.twofa.modal.secu_title')}</b>
          <p>{t('ProfileView.twofa.modal.secu_description')}</p>
        </div>
      </div>
      <div className={viewStyles['set-view-content-twofa-point']}>
        <img className={viewStyles['set-view-content-twofa-point-image']} alt="{t('ProfileView.twofa.modal.protect_title')}" src={twoFaModalProtect} />
        <div>
          <b>{t('ProfileView.twofa.modal.protect_title')}</b>
          <p>{t('ProfileView.twofa.modal.protect_description')}</p>
        </div>
      </div>
    </div>
    <div className={viewStyles['set-view-content-twofa-modal-content-button']}>
      <Button
        onClick={activate2FA}>
        {t('ProfileView.twofa.modal.button.activate')}
      </Button>
    </div>
  </Fragment>
))

const ActivationConfirmed = translate()(({
  t,
  closeTwoFAActivationModal,
  instance,
  cozyDomain
}) => (
  <Fragment>
    <h3>{t('ProfileView.twofa.modal.validation_title')}</h3>
    <p>{t('ProfileView.twofa.modal.validation_description')}</p>
    <p>{t('ProfileView.twofa.modal.validation_logs')}</p>
    <ul>
      <li>{instance && instance.data.attributes.email}</li>
      <li>{cozyDomain}</li>
    </ul>
    <div className={viewStyles['set-view-content-twofa-modal-content-right-buttons']}>
      <Button
        onClick={closeTwoFAActivationModal}>
        {t('ProfileView.twofa.modal.button.terminate')}
      </Button>
    </div>
  </Fragment>
))

const MailConfirmationCode = translate()(({
  fields,
  t,
  checkMailConfirmationCode,
  closeTwoFAActivationModal,
  onChange,
  email
}) => (
  <Fragment>
    <div>
      <h3>{t('ProfileView.twofa.modal.confirmation_title')}</h3>
      <ReactMarkdownWrapper
        source={
          t('ProfileView.twofa.modal.confirmation_description', {email: email})
        }
      />
    </div>
    <label className={styles['coz-form-label']}>{t('ProfileView.twofa.modal.code')}</label>
    <div className={viewStyles['set-view-content-twofa-modal-confirmation-input']}>
      <Input
        name='mail_confirmation_code'
        type='text'
        {...fields.mail_confirmation_code}
        onChange={onChange}
        value=''
      />
      <div className={viewStyles['set-view-content-twofa-modal-nocode']}>
        <p>{t('ProfileView.twofa.modal.nocode')}</p>
        <p>{t('ProfileView.twofa.modal.nocode_claude')}<a href='mailto:claude@cozycloud.cc'>claude@cozycloud.cc</a></p>
      </div>
    </div>
    <div className={viewStyles['set-view-content-twofa-modal-content-right-buttons']}>
      <Button
        onClick={closeTwoFAActivationModal}
        theme='secondary'
      >
        {t('ProfileView.twofa.modal.button.cancel')}
      </Button>
      <Button
        onClick={() => checkMailConfirmationCode(fields.mail_confirmation_code.value)}
      >
        {t('ProfileView.twofa.modal.button.validate')}
      </Button>
    </div>
  </Fragment>
))

const Desactivate2FA = translate()(({t, desactivate2FA, closeTwoFADesactivationModal}) => (
  <Fragment>
    <p><b>{t('ProfileView.twofa.modal.desactivate_title')}</b></p>
    <p>{t('ProfileView.twofa.modal.desactivate_description')}</p>
    <div className={viewStyles['set-view-content-twofa-modal-content-right-buttons']}>
      <Button
        onClick={closeTwoFADesactivationModal}
        theme='secondary'
        >
        {t('ProfileView.twofa.modal.button.cancel')}
      </Button>
      <Button
        onClick={desactivate2FA}
        theme='danger'
      >
        {t('ProfileView.twofa.modal.button.desactivate')}
      </Button>
    </div>
  </Fragment>
))

export default translate()(ProfileView)
