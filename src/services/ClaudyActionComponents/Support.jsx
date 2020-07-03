import React, { Component } from 'react'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Button } from 'cozy-ui/transpiled/react/Button'
import Icon from 'cozy-ui/transpiled/react/Icon'

export class Support extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hideContent: false, // to avoid scrollbar in actions list view
      message: ''
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    this.onOpen()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.opened !== this.props.opened) {
      nextProps.opened ? this.onOpen() : this.onReturn()
    }

    // if message successfully sent
    if (
      nextProps.emailStatus.isSent &&
      this.props.emailStatus.isSending &&
      !this.props.emailStatus.isSent
    ) {
      this.setState({ message: '' })
      // usually go back on success
      this.props.onSuccess(this.props.t('claudy.actions.support.success'))
    }
  }

  onOpen() {
    this.props.resizeIntent(30 * 16) // 30em
    this.setState({ hideContent: false })
    const listenerToFocus = e => {
      if (e.propertyName === 'transform') {
        if (this.messageInput && this.messageInput.focus)
          this.messageInput.focus()
        e.target.removeEventListener('transitionend', listenerToFocus)
      }
    }
    this.props.container.addEventListener(
      'transitionend',
      listenerToFocus,
      false
    )
  }

  onReturn() {
    this.props.resizeIntentDefault()
    const listenerToHide = e => {
      if (e.propertyName === 'transform') {
        this.setState({ hideContent: true })
        e.target.removeEventListener('transitionend', listenerToHide)
      }
    }
    this.props.container.addEventListener(
      'transitionend',
      listenerToHide,
      false
    )
  }

  sendMessage() {
    this.props.sendMessageToSupport(this.state.message)
  }

  render() {
    const { t, iconSrc, emailStatus } = this.props
    const { hideContent, message } = this.state
    const { isSent, isSending, error } = emailStatus
    return (
      <div className="coz-claudy-menu-action-description coz-claudy-menu-action--support">
        <div className="coz-claudy-menu-action-description-header">
          <img className="coz-claudy-menu-action-icon" src={iconSrc} />
          <p className="coz-claudy-menu-action-title">
            {t(`claudy.actions.support.description`)}
          </p>
        </div>
        {!hideContent && (
          <div className="coz-claudy-menu-action-description-content coz-form">
            <label className="coz-form-label">
              {t('claudy.actions.support.fields.message.title')}
              <textarea
                className="set-services-claudy-textarea"
                value={message}
                ref={input => {
                  this.messageInput = input
                }}
                placeholder={t(
                  'claudy.actions.support.fields.message.placeholder'
                )}
                onChange={e => {
                  this.setState({ message: e.target.value })
                }}
              />
            </label>
            {((!isSent && !isSending && !error) ||
              (isSent && !isSending && !error)) && (
              <p className="coz-claudy-menu-action-description-detail">
                {t('claudy.actions.support.emailDetail')}
              </p>
            )}
            {!isSending &&
              error && (
                <p className="coz-claudy-menu-action-description-error">
                  {error.i18n && `${t(error.i18n)}`}
                  {error.message &&
                    `${t('claudy.actions.support.error')} : ${error.message}`}
                  {!error.i18n &&
                    !error.message &&
                    t('claudy.actions.support.error')}
                </p>
              )}
            {isSending && (
              <p className="coz-claudy-menu-action-description-detail">
                {t('claudy.actions.support.sending')}
              </p>
            )}
            <Button
              onClick={() => this.sendMessage()}
              disabled={!message}
              busy={isSending}
            >
              <Icon icon="paperplane" />
              {t('claudy.actions.support.button')}
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default translate()(Support)
