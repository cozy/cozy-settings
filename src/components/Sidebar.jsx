import styles from '../styles/sidebar'

import React from 'react'

import Nav from './Nav'

const Sidebar = () => (
  <aside class={styles['set-sidebar']}>
    <Nav />
  </aside>
)

export default Sidebar
