
import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

export const Support = ({ t, action, iconSrc, url, onActionClick }) => {
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

export default translate()(Support)
