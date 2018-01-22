
import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'

export const ClaudyAction = ({ t, action, iconSrc, url, onActionClick }) => {
  return (
    <div className='coz-claudy-menu-action-description'>
      <div className='coz-claudy-menu-action-description-header'>
        <img
          className='coz-claudy-menu-action-icon'
          src={iconSrc}
        />
        <p className='coz-claudy-menu-action-title'>
          {t(`claudy.actions.${action.slug}.title`)}
        </p>
      </div>
      <div className='coz-claudy-menu-action-description-content'>
        <p className='coz-claudy-menu-action-description-text'>
          {t(`claudy.actions.${action.slug}.description`)}
        </p>
        {url
          ? <a
            href={url}
            role='button'
            target={action.link.type === 'external' ? '_blank' : '_parent'}
            className='coz-btn-regular coz-claudy-menu-action-description-button'
            onClick={onActionClick}
          >
            {t(`claudy.actions.${action.slug}.button`)}
          </a>
          : <Button
            className='coz-claudy-menu-action-description-button'
            disabled
            title={`App ${action.link.appSlug} not found`}
          >
            {t(`claudy.actions.${action.slug}.button`)}
          </Button>
        }
      </div>
    </div>
  )
}

export default translate()(ClaudyAction)
