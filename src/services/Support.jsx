import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'
import Textarea from 'cozy-ui/react/Textarea'

export class Support extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // reset message if successfully sent
    if (nextProps.emailStatus.isSent && this.props.emailStatus.isSending) {
      this.setState({ message: '' })
    }
  }

  sendMessage() {
    this.props.sendMessageToSupport(this.state.message)
  }

  render() {
    const { t, iconSrc, emailStatus } = this.props
    const { message } = this.state
    const { isSent, isSending, error } = emailStatus
    return (
      <div className="set-support-form">
        <div className="set-support-form-header">
          <img className="set-support-form-header-icon" src={iconSrc} />
          <p className="set-support-form-header-title">{t(`support.title`)}</p>
        </div>
        <div className="set-support-form-content coz-form">
          <label className="coz-form-label">
            {t('support.fields.message.title')}
            <Textarea
              className="set-services-support-form-textarea"
              value={message}
              ref={input => {
                this.messageInput = input
              }}
              placeholder={t('support.fields.message.placeholder')}
              onChange={e => {
                this.setState({ message: e.target.value })
              }}
            />
          </label>
          {((!isSent && !isSending && !error) ||
            (isSent && !isSending && !error && message)) && (
            <p className="set-support-form-detail">
              {t('support.emailDetail')}
            </p>
          )}
          {!isSending &&
            isSent &&
            !message && (
              <p className="set-support-form-success">{t('support.success')}</p>
            )}
          {!isSending &&
            error && (
              <p className="set-support-form-error">
                {error.i18n && `${t(error.i18n)}`}
                {error.message && `${t('support.error')} : ${error.message}`}
                {!error.i18n && !error.message && t('support.error')}
              </p>
            )}
          {isSending && (
            <p className="set-support-form-detail">{t('support.sending')}</p>
          )}
          <Button
            onClick={() => this.sendMessage()}
            disabled={!message}
            busy={isSending}
            icon="paperplane"
            label={t('support.button')}
          />
        </div>
      </div>
    )
  }
}

export default translate()(Support)
