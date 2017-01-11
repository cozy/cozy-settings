import styles from '../styles/sidebar'

import React from 'react'

import Nav from './Nav'

const Sidebar = () => (
  <aside class={styles['coz-sidebar']}>
    <Nav />
  </aside>
)

export default Sidebar
