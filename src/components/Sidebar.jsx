import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import Nav, {
  NavLink,
  NavItem,
  NavIcon,
  NavText
} from 'cozy-ui/transpiled/react/Nav'
import UISidebar from 'cozy-ui/transpiled/react/Sidebar'
import styles from 'styles/sidebar.styl'
import HandIcon from 'cozy-ui/transpiled/react/Icons/Hand'
import boxIcon from 'assets/icons/icon-box.svg'
import globeIcon from 'assets/icons/icon-globe.svg'
import devicesIcon from 'assets/icons/icon-phone.svg'
import peopleIcon from 'assets/icons/icon-people.svg'
import { useI18n } from 'cozy-ui/transpiled/react'

export const Sidebar = () => {
  const { t } = useI18n()

  return (
    <UISidebar className={styles['o-sidebar']}>
      <Nav>
        <NavItem>
          <RouterLink
            to="/profile"
            className={NavLink.className}
            activeClassName={NavLink.activeClassName}
          >
            <NavIcon icon={peopleIcon} />
            <NavText>{t('Nav.profile')}</NavText>
          </RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink
            to="/connectedDevices"
            className={NavLink.className}
            activeClassName={NavLink.activeClassName}
          >
            <NavIcon icon={devicesIcon} />
            <NavText>{t('Nav.connected_devices')}</NavText>
          </RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink
            to="/sessions"
            className={NavLink.className}
            activeClassName={NavLink.activeClassName}
          >
            <NavIcon icon={globeIcon} />
            <NavText>{t('Nav.sessions')}</NavText>
          </RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink
            to="/storage"
            className={NavLink.className}
            activeClassName={NavLink.activeClassName}
          >
            <NavIcon icon={boxIcon} />
            <NavText>{t('Nav.storage')}</NavText>
          </RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink
            to="/permissions"
            className={NavLink.className}
            activeClassName={NavLink.activeClassName}
          >
            <NavIcon icon={HandIcon} />
            <NavText>{t('Nav.permissions')}</NavText>
          </RouterLink>
        </NavItem>
      </Nav>
    </UISidebar>
  )
}

export default Sidebar
