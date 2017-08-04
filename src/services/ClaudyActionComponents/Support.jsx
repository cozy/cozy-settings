
import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'
import { isValidEmail } from '../../lib/emailHelper'

export class Support extends Component {
  constructor (props) {
    super(props)
    const emailFromInstance = props.instanceData && props.instanceData.attributes.email || ''
    this.state = {
      hideContent: false, // to avoid scrollbar in actions list view
      email: emailFromInstance,
      message: '',
      isEmailValid: emailFromInstance && isValidEmail(emailFromInstance) || false
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount () {
    this.onOpen()
  }

  componentWillReceiveProps (nextProps) {
    // if email from instance and input not already filled
    if (!this.state.email && nextProps.instanceData) {
      const email = nextProps.instanceData.attributes.email
      this.setState({
        email,
        isEmailValid: isValidEmail(email)
      })
    }
    nextProps.opened !== this.props.opened && nextProps.opened
      ? this.onOpen() : this.onReturn()
  }

  resize () {
    typeof this.props.resizeIntent === 'function' && this.props.resizeIntent({
      height: (31.5 * 16) // 31.5em
    }, '.2s .2s ease-out')
  }

  onOpen () {
    this.resize()
    this.setState({ hideContent: false })
    const listenerToFocus = (e) => {
      if (e.propertyName === 'transform') {
        if (this.messageInput && this.messageInput.focus) this.messageInput.focus()
        e.target.removeEventListener('transitionend', listenerToFocus)
      }
    }
    this.props.contener.addEventListener('transitionend', listenerToFocus, false)
  }

  onReturn () {
    this.props.resizeIntentDefault()
    const listenerToHide = (e) => {
      if (e.propertyName === 'transform') {
        this.setState({ hideContent: true })
        e.target.removeEventListener('transitionend', listenerToHide)
      }
    }
    this.props.contener.addEventListener('transitionend', listenerToHide, false)
  }

  sendMessage () {
    this.props.onActionClick()

  handleChange (property, value) {
    const stateUpdate = {}
    switch (property) {
      case 'email':
        stateUpdate.email = value
        stateUpdate.isEmailValid = isValidEmail(value)
        break
      case 'message':
        stateUpdate.message = value
        break
    }
    this.setState(stateUpdate)
  }

  render () {
    const { t, action, iconSrc } = this.props
    const { hideContent, email, message, isEmailValid } = this.state
    const emailError = email && !isEmailValid
    const isFormNotValid = !email || !message || emailError
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
        {!hideContent &&
          <div className='coz-claudy-menu-action-description-content coz-form'>
            <label className='coz-form-label'>
              {t('claudy.actions.support.fields.message.title')}
              <textarea
                className='set-services-claudy-textarea'
                value={message}
                ref={(input) => { this.messageInput = input }}
                placeholder={t('claudy.actions.support.fields.message.placeholder')}
                onChange={(e) => { this.handleChange('message', e.target.value) }}
              />
            </label>
            <label className='coz-form-label'>
              {t('claudy.actions.support.fields.email.title')}
              <input
                type='email'
                value={email}
                className={emailError ? 'error' : ''}
                ref={(input) => { this.emailInput = input }}
                placeholder={t('claudy.actions.support.fields.email.placeholder')}
                onChange={(e) => { this.handleChange('email', e.target.value) }}
              />
            </label>
            {emailError &&
              <p className='errors'>
                {t('claudy.actions.support.emailError')}
              </p>
            }
            <button
              role='button'
              className='coz-btn-regular coz-btn-send'
              onClick={() => this.sendMessage()}
              disabled={isFormNotValid}
            >
              {t('claudy.actions.support.button')}
            </button>
          </div>
        }
      </div>
    )
  }
}

export default translate()(Support)
