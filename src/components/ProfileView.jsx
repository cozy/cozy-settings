import viewStyles from '../styles/view'

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
      twoFAModalIsOpen: false
    }
    this.activate2FA = this.activate2FA.bind(this)
    this.openTwoFAModal = this.openTwoFAModal.bind(this)
    this.closeTwoFAModal = this.closeTwoFAModal.bind(this)
  }
  componentWillMount () {
    this.props.fetchInfos()
  }
  activate2FA () {
    // TODO: Open the password modal
    this.props.updateInfo('twofa', true)
    this.closeTwoFAModal()
  }
  desactivate2FA () {
    // TODO: Open the password modal
    this.props.updateInfo('twofa', false)
    this.closeTwoFAModal()
  }
  openTwoFAModal () {
    this.setState({twoFAModalIsOpen: true})
  }
  closeTwoFAModal () {
    this.setState({twoFAModalIsOpen: false})
  }
  render () {
    const { t, fields, passphrase, isFetching, onFieldChange, onPassphraseSubmit, instance } = this.props
    const { twoFAModalIsOpen } = this.state
    return (
      <div role='contentinfo'>
        <div className={classNames(viewStyles['set-view-content'], viewStyles['set-view-content--narrow'])}>
          { isFetching && <p>Loading...</p> }
          <h2 className={viewStyles['set-view-title']}>{t('ProfileView.title')}</h2>
          <Input
            name='email'
            type='email'
            title={t('ProfileView.email.title')}
            label={t('ProfileView.email.label')}
            {...fields.email}
            onChange={onFieldChange} />
          <Input
            name='public_name'
            type='text'
            title={t('ProfileView.public_name.title')}
            label={t(`ProfileView.public_name.label`)}
            {...fields.public_name}
            onChange={onFieldChange} />
          <PassphraseForm {...passphrase} onSubmit={onPassphraseSubmit} />
          <Input
            name='twofa'
            type='checkbox'
            label={t('ProfileView.twofa.title.activate')}
            description={t('ProfileView.twofa.label', {link: 'https://support.cozy.io/article/114-doubleauthentification'})}
            {...fields.twofa}
            onChange={this.openTwoFAModal}
          />
          <Select
            name='locale'
            title={t('ProfileView.locale.title')}
            label={t(`ProfileView.locale.label`)}
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
            title={t('ProfileView.tracking.title')}
            label={t('ProfileView.tracking.label')}
            {...fields.tracking}
            onChange={onFieldChange}
          />
          <a href={t('ProfileView.tos.version', {version: instance && instance.data.attributes.tos ? `-${instance.data.attributes.tos}` : '-201711'})} target='_blank'>
            {t('ProfileView.tos.link')}
          </a>
          {
            twoFAModalIsOpen && <div className={viewStyles['set-view-content-twofa-modal-wrapper']}>
              <Modal
                dismissAction={() => this.closeTwoFAModal()}
                className={viewStyles['set-view-content-twofa-modal']}
                title={
                  t(fields.twofa.value
                    ? 'ProfileView.twofa.title.desactivate'
                    : 'ProfileView.twofa.title.activate'
                  )
                }
              >
                <ModalContent
                  className={viewStyles['set-view-content-twofa-modal-content']}
                >
                  {
                    fields.twofa.value
                    ? <Desactivate2FA
                      desactivate2FA={() => this.desactivate2FA()}
                      closeTwoFAModal={() => this.closeTwoFAModal()}
                    />
                    : <Activate2FA
                      activate2FA={() => this.activate2FA()}
                    />
                  }
                </ModalContent>
              </Modal>
            </div>
          }
        </div>
      </div>
    )
  }
}

const Activate2FA = translate()(({t, activate2FA}) => (
  <Fragment>
    <img
      alt={t('ProfileView.twofa.title')}
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

const Desactivate2FA = translate()(({t, desactivate2FA, closeTwoFAModal}) => (
  <Fragment>
    <p><b>{t('ProfileView.twofa.modal.desactivate_title')}</b></p>
    <p>{t('ProfileView.twofa.modal.desactivate_description')}</p>
    <div className={viewStyles['set-view-content-twofa-modal-content-desactivate-buttons']}>
      <Button
        onClick={closeTwoFAModal}
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
