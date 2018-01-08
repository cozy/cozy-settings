import styles from '../styles/empty'
import { ButtonLink } from 'cozy-ui/react/Button'

import React from 'react'
import { translate } from 'cozy-ui/react/I18n'

export const Empty = ({ t, emptyType }) => {
  return (
    <div>
      {emptyType === 'devices' &&
        <div className={styles['set-empty']}>
          <h2>{t('Empty.devices.title')}</h2>
          <p>{t('Empty.devices.text')}</p>
          <p>
            <ButtonLink
              className={styles['set-empty-button']}
              href={t('Empty.devices.link.href')}
              target
            >
              {t('Empty.devices.link.text')}
            </ButtonLink>
          </p>
        </div>
      }
    </div>
  )
}

export default translate()(Empty)
