import styles from '../styles/nav'

import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'
import { Link } from 'react-router'

const Nav = ({ t }) => (
  <nav>
    <ul className={styles['coz-nav']}>
      <li className={styles['coz-nav-item']}>
        <Link to='/account' className={styles['set-cat-account']} activeClassName={styles['active']}>
          { t('Nav.account') }
        </Link>
      </li>
      <li className={styles['coz-nav-item']}>
        <Link to='/connectedDevices' className={styles['set-cat-devices']} activeClassName={styles['active']}>
          { t('Nav.connected_devices') }
        </Link>
      </li>
      <li className={styles['coz-nav-item']}>
        <Link to='/storage' className={styles['set-cat-storage']} activeClassName={styles['active']}>
          { t('Nav.storage') }
        </Link>
      </li>
      <li className={styles['coz-nav-item']}>
        <Link to='/emailNotifications' className={styles['set-cat-notif']} activeClassName={styles['active']}>
          { t('Nav.email_notifications') }
        </Link>
      </li>
    </ul>
  </nav>
)

export default translate()(Nav)
