import styles from '../styles/nav'

import React from 'react'
import { translate } from '../plugins/preact-polyglot'
import { Link } from 'react-router'

const Nav = ({ t }) => (
  <nav>
    <ul class={styles['set-nav']}>
      <li class={styles['set-nav-item']}>
        <Link to='/account' class={styles['set-cat-account']} activeClassName={styles['active']}>
          { t('Nav.account') }
        </Link>
      </li>
      <li class={styles['set-nav-item']}>
        <Link to='/connectedDevices' class={styles['set-cat-devices']} activeClassName={styles['active']}>
          { t('Nav.connected_devices') }
        </Link>
      </li>
      <li class={styles['set-nav-item']}>
        <Link to='/storage' class={styles['set-cat-storage']} activeClassName={styles['active']}>
          { t('Nav.storage') }
        </Link>
      </li>
      <li class={styles['set-nav-item']}>
        <Link to='/emailNotifications' class={styles['set-cat-notif']} activeClassName={styles['active']}>
          { t('Nav.email_notifications') }
        </Link>
      </li>
    </ul>
  </nav>
)

export default translate()(Nav)
