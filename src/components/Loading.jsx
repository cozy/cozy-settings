import styles from '../styles/loading'

import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

export const Loading = ({ t }) => {
  return (
    <div className={styles['set-loading']}>
      <p>{t('Loading.loading')}</p>
    </div>
  )
}

export default translate()(Loading)
