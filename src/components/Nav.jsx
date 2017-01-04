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
    </ul>
  </nav>
)

export default translate()(Nav)
