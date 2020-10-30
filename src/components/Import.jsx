import React, { Component } from 'react'

import { STACK_DOMAIN } from 'actions'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import Modal, {
  ModalHeader,
  ModalDescription,
  ModalFooter
} from 'cozy-ui/transpiled/react/Modal'
import { Button } from 'cozy-ui/transpiled/react/Button'
import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogCloseButton
} from 'cozy-ui/transpiled/react/Dialog'

import viewStyles from 'styles/view'
import formStyles from 'styles/fields'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'

const importImage = require('assets/images/import-cozy.svg')

class Import extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayModal: false,
      displayConfirmation: false,
      url: ''
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleConfirmation = this.toggleConfirmation.bind(this)
    this.setURL = this.setURL.bind(this)
    this.precheckImport = this.precheckImport.bind(this)
    this.submitImport = this.submitImport.bind(this)
  }

  toggleModal() {
    this.setState(currentState => ({
      displayModal: !currentState.displayModal
    }))
  }

  toggleConfirmation() {
    this.setState(currentState => ({
      displayConfirmation: !currentState.displayConfirmation
    }))
  }

  setURL(event) {
    this.setState({ url: event.target.value })
  }

  async precheckImport() {
    try {
      await this.props.precheckImport(this.state.url)
      this.setState({ displayConfirmation: true })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  async submitImport() {
    try {
      let redirect = await this.props.submitImport(this.state.url)
      window.location = redirect
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  render() {
    const { t, importData } = this.props
    const { displayModal, displayConfirmation } = this.state
    return (
      <div>
        <div className={viewStyles['set-view-section']}>
          <p className="u-mt-1">
            <Button
              onClick={this.toggleModal}
              label={t('ProfileView.import.link')}
              extension="full"
            />
          </p>
        </div>
        {displayModal && (
          <Modal
            className={viewStyles['set-export-modal']}
            secondaryAction={this.toggleModal}
            mobileFullscreen
          >
            <ModalHeader className="u-ta-center u-pr-0">
              <img
                className={viewStyles['set-export-modal-image']}
                alt={t('ProfileView.import.modal.title')}
                src={importImage}
              />
              <h2 className={viewStyles['set-export-modal-title']}>
                {t('ProfileView.import.modal.title')}
              </h2>
            </ModalHeader>
            <ModalDescription
              className={viewStyles['set-export-modal-description']}
            >
              <ReactMarkdownWrapper
                source={t('ProfileView.import.modal.description')}
              />
              <TextField
                required
                error={!!importData.error}
                autoFocus
                onChange={this.setURL}
                label={t('ProfileView.import.url.label')}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              {importData.error && (
                <p className={formStyles['coz-form-errors']}>
                  {t(importData.error)}
                </p>
              )}
            </ModalDescription>
            <ModalFooter className={viewStyles['set-export-modal-footer']}>
              <Button
                theme="secondary"
                onClick={this.toggleModal}
                label={t('ProfileView.import.modal.cancel')}
              />
              <Button
                theme="primary"
                onClick={this.precheckImport}
                busy={importData.checking}
                disabled={importData.checking}
                label={t('ProfileView.import.modal.CTA')}
              />
            </ModalFooter>
          </Modal>
        )}
        <Dialog
          open={displayConfirmation}
          onClose={this.toggleConfirmation}
          fullScreen={false}
        >
          <DialogCloseButton onClick={this.toggleConfirmation} />
          <DialogTitle>
            {t('ProfileView.import.confirmation.title')}
          </DialogTitle>
          <DialogContent>
            <ReactMarkdownWrapper
              source={t('ProfileView.import.confirmation.description', {
                url: STACK_DOMAIN.replace('//', '')
              })}
            />
            {importData.error && (
              <p className={formStyles['coz-form-errors']}>
                {t(importData.error)}
              </p>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              theme="secondary"
              onClick={this.toggleConfirmation}
              label={t('ProfileView.import.confirmation.cancel')}
            />
            <Button
              theme="danger"
              onClick={this.submitImport}
              busy={importData.submitting}
              disabled={importData.submitting}
              label={t('ProfileView.import.confirmation.CTA')}
            />
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default translate()(Import)
