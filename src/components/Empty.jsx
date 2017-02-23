import styles from '../styles/empty'

import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

export const Empty = ({ t, emptyType }) => {
  return (
    <div>
      {emptyType === 'devices' &&
        <div className={styles['set-empty']}>
          <h2>{ t('Empty.devices_title') }</h2>
          <p>{ t('Empty.devices_text')}</p>
        </div>
      }
    </div>
  )
}

export default translate()(Empty)
