import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { NavLink as RouterLink } from 'react-router-dom'
import Nav, {
  NavLink,
  NavItem,
  NavIcon,
  NavText
} from 'cozy-ui/react/Nav'

import styles from '../styles/sidebar'

import boxIcon from '../assets/icons/icon-box.svg'
import globeIcon from '../assets/icons/icon-globe.svg'
import devicesIcon from '../assets/icons/icon-phone.svg'
import peopleIcon from '../assets/icons/icon-people.svg'

export const Sidebar = ({ t }) => (
  <aside className={styles['o-sidebar']}>
    <Nav>
      <NavItem>
        <RouterLink
          to='/profile'
          className={NavLink.className}
          activeClassName={NavLink.activeClassName}
        >
          <NavIcon icon={peopleIcon} />
          <NavText>{t('Nav.profile')}</NavText>
        </RouterLink>
      </NavItem>
      <NavItem>
        <RouterLink
          to='/connectedDevices'
          className={NavLink.className}
          activeClassName={NavLink.activeClassName}
        >
          <NavIcon icon={devicesIcon} />
          <NavText>{t('Nav.connected_devices')}</NavText>
        </RouterLink>
      </NavItem>
      <NavItem>
        <RouterLink
          to='/sessions'
          className={NavLink.className}
          activeClassName={NavLink.activeClassName}
        >
          <NavIcon icon={globeIcon} />
          <NavText>{t('Nav.sessions')}</NavText>
        </RouterLink>
      </NavItem>
      <NavItem>
        <RouterLink
          to='/storage'
          className={NavLink.className}
          activeClassName={NavLink.activeClassName}
        >
          <NavIcon icon={boxIcon} />
          <NavText>{t('Nav.storage')}</NavText>
        </RouterLink>
      </NavItem>
    </Nav>
  </aside>
)

export default translate()(Sidebar)
