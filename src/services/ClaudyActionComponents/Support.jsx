
import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

export class Support extends Component {
  constructor (props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount () {
    const listenerToFocus = (e) => {
      if (this.messageInput && this.messageInput.focus) this.messageInput.focus()
      e.target.removeEventListener('transitionend', listenerToFocus)
    }
    this.props.contener.addEventListener('transitionend', listenerToFocus)
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.opened) return
    const listenerToFocus = (e) => {
      if (this.messageInput && this.messageInput.focus) this.messageInput.focus()
      e.target.removeEventListener('transitionend', listenerToFocus)
    }
    this.props.contener.addEventListener('transitionend', listenerToFocus)
  }

  sendMessage () {
    this.props.onActionClick()
  }

  render () {
    const { t, action, iconSrc } = this.props
    return (
      <div className='coz-claudy-menu-action-description coz-claudy-menu-action--support'>
        <div className='coz-claudy-menu-action-description-header'>
          <img
            className='coz-claudy-menu-action-icon'
            src={iconSrc}
          />
          <p className='coz-claudy-menu-action-title'>
            {t(`claudy.actions.${action.slug}.title`)}
          </p>
        </div>
        <div className='coz-claudy-menu-action-description-content coz-form'>
          <label className='coz-form-label'>
            {t('claudy.actions.support.fields.message.title')}
            <textarea
              className='set-services-claudy-textarea'
              ref={(input) => { this.messageInput = input }}
              placeholder={t('claudy.actions.support.fields.message.placeholder')}
            />
          </label>
          <label className='coz-form-label'>
            {t('claudy.actions.support.fields.email.title')}
            <input
              type='email'
              placeholder={t('claudy.actions.support.fields.email.placeholder')}
            />
          </label>
          <button
            role='button'
            className='coz-btn-regular coz-btn-send'
          >
            {t('claudy.actions.support.button')}
          </button>
        </div>
      </div>
    )
  }
}

export default translate()(Support)
