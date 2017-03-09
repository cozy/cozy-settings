import styles from '../styles/devicesList'

import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/helpers/i18n'

const ConnectedDevices = ({ t }) => (

  <div role='contentinfo'>

    <div className={styles['tablelist-table']}>
      <h2>{t('ConnectedDevices.title')}</h2>

      <div className={styles['tablelist-row']}>
        <div className={classNames(styles['tablelist-header'], styles['tablelist-device'])}>{t('ConnectedDevices.head_name')}</div>
        <div className={styles['tablelist-header']}>{t('ConnectedDevices.head_activity')}</div>
        <div className={styles['tablelist-header']}>{t('ConnectedDevices.head_permissions')}</div>
        <div className={styles['tablelist-header']}>{t('ConnectedDevices.head_actions')}</div>
      </div>

    </div>

    <div className={styles['tablelist-body']}>
      {/* Device Component to display here */}
    </div>

  </div>

)

export default translate()(ConnectedDevices)

