import styles from '../styles/nav'
import classNames from 'classnames'

import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'
import { Link } from 'react-router'

const Nav = ({ t }) => (
  <nav>
    <ul className={styles['coz-nav']}>
      <li className={styles['coz-nav-item']}>
        <Link to='/profile' className={classNames(styles['set-cat-profile'], styles['coz-nav-link'])} activeClassName={styles['active']}>
          { t('Nav.profile') }
        </Link>
      </li>
      <li className={styles['coz-nav-item']}>
        <Link to='/activatedServices' className={classNames(styles['set-cat-services'], styles['coz-nav-link'])} activeClassName={styles['active']}>
          { t('Nav.activated_services') }
        </Link>
      </li>
      <li className={styles['coz-nav-item']}>
        <Link to='/connectedDevices' className={classNames(styles['set-cat-devices'], styles['coz-nav-link'])} activeClassName={styles['active']}>
          { t('Nav.connected_devices') }
        </Link>
      </li>
    </ul>
  </nav>
)

export default translate()(Nav)
