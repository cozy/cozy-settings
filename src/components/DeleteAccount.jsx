import React, { Component } from 'react'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Button from 'cozy-ui/transpiled/react/Button'
import Typography from 'cozy-ui/transpiled/react/Typography'

import ConfirmModal from 'components/DeleteAccount/ConfirmModal'
import FormModal from 'components/DeleteAccount/FormModal'

const CONFIRMING = 'confirming'
const IDLE = 'idle'
const REQUESTING = 'requesting'

export class DeleteAccount extends Component {
  state = {
    status: IDLE
  }

  cancel = () => {
    this.setStatus(IDLE)
  }

  confirm = () => this.setStatus(CONFIRMING)

  request = () => this.setStatus(REQUESTING)

  setStatus = status => this.setState({ status })

  onError = error => {
    const { t } = this.props
    this.setStatus(IDLE)
    console.error(error.message) // eslint-disable-line no-console
    Alerter.error(t('DeleteAccount.error.message'))
  }

  onRequested = () => {
    const { t } = this.props
    this.setStatus(IDLE)
    Alerter.success(t('DeleteAccount.success.message'))
  }

  render = () => {
    const { t } = this.props
    const { status } = this.state
    return (
      <>
        {status === CONFIRMING && (
          <ConfirmModal
            dismissAction={this.cancel}
            primaryAction={this.request}
          />
        )}
        {status === REQUESTING && (
          <FormModal
            onClose={this.cancel}
            onError={this.onError}
            onSuccess={this.onRequested}
          />
        )}
        <div>
          <Typography variant="h5" gutterBottom>
            {t('DeleteAccount.title')}
          </Typography>
          <Typography variant="body1">{t('DeleteAccount.label')}</Typography>
          <div className="u-mt-1">
            <Button
              busy={status === REQUESTING}
              disabled={status !== IDLE}
              extension="full"
              label={t('DeleteAccount.button.label')}
              onClick={this.confirm}
              theme="danger-outline"
            />
          </div>
        </div>
      </>
    )
  }
}

export default translate()(DeleteAccount)
