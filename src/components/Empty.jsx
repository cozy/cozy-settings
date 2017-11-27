import styles from '../styles/empty'
import classNames from 'classnames'

import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

export const Empty = ({ t, emptyType }) => {
  return (
    <div>
      {emptyType === 'devices' &&
        <div className={styles['set-empty']}>
          <h2>{t('Empty.devices.title')}</h2>
          <p>{t('Empty.devices.text')}</p>
          <p><a className={classNames('coz-btn', 'coz-btn--regular', styles['set-empty-button'])} href={t('Empty.devices.link.href')} target='_blank'>{t('Empty.devices.link.text')}</a></p>
        </div>
      }
    </div>
  )
}

export default translate()(Empty)
