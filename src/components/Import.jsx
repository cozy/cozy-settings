import React, { Component } from 'react'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import Modal, {
  ModalHeader,
  ModalDescription,
  ModalFooter
} from 'cozy-ui/transpiled/react/Modal'
import { Button } from 'cozy-ui/transpiled/react/Button'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'

import viewStyles from 'styles/view'
import formStyles from 'styles/fields'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'

const importImage = require('assets/images/import-cozy.svg')

class Import extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayModal: false,
      url: ''
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.setURL = this.setURL.bind(this)
    this.submitImport = this.submitImport.bind(this)
  }

  toggleModal() {
    this.setState(currentState => ({
      displayModal: !currentState.displayModal
    }))
  }

  setURL(event) {
    this.setState({ url: event.target.value })
  }

  submitImport() {
    this.props.precheckImport(this.state.url)
  }

  render() {
    const { t, importData } = this.props
    const { displayModal } = this.state
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
              <MuiCozyTheme>
                <TextField
                  required
                  autoFocus={true}
                  onChange={this.setURL}
                  label={t('ProfileView.import.url.label')}
                  fullWidth={true}
                  margin="normal"
                  variant="outlined"
                />
              </MuiCozyTheme>
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
                onClick={this.submitImport}
                busy={importData.checking}
                disabled={importData.checking}
                label={t('ProfileView.export.modal.CTA')}
              />
            </ModalFooter>
          </Modal>
        )}
      </div>
    )
  }
}

export default translate()(Import)
