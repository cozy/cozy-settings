
import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

const PRODUCT_BOARD_ADDRESS = 'inbox-71676b3c6daf8cb8@inbound.productboard.com'

export class Support extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hideContent: false, // to avoid scrollbar in actions list view
      message: ''
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount () {
    this.onOpen()
  }

  componentWillReceiveProps (nextProps) {
    nextProps.opened !== this.props.opened && nextProps.opened
      ? this.onOpen() : this.onReturn()
  }

  resize () {
    typeof this.props.resizeIntent === 'function' && this.props.resizeIntent({
      height: (27.5 * 16) // 27.5em
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

  render () {
    const { t, action, iconSrc } = this.props
    const { hideContent, message } = this.state
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
                onChange={(e) => { this.setState({message: e.target.value}) }}
              />
            </label>
            <p className='coz-claudy-menu-action-description-detail'>
              {t('claudy.actions.support.emailDetail')}
            </p>
            <button
              role='button'
              className='coz-btn-regular coz-btn-send'
              onClick={() => this.sendMessage()}
              disabled={!message}
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
