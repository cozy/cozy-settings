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
import GlobeIcon from 'cozy-ui/transpiled/react/Icons/Globe'
import PeopleIcon from 'cozy-ui/transpiled/react/Icons/People'
import PhoneIcon from 'cozy-ui/transpiled/react/Icons/Phone'
import ArchiveIcon from 'cozy-ui/transpiled/react/Icons/Archive'
import { useI18n } from 'cozy-ui/transpiled/react'
import flag from 'cozy-flags'

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
            <NavIcon icon={PeopleIcon} />
            <NavText>{t('Nav.profile')}</NavText>
          </RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink
            to="/connectedDevices"
            className={NavLink.className}
            activeClassName={NavLink.activeClassName}
          >
            <NavIcon icon={PhoneIcon} />
            <NavText>{t('Nav.connected_devices')}</NavText>
          </RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink
            to="/sessions"
            className={NavLink.className}
            activeClassName={NavLink.activeClassName}
          >
            <NavIcon icon={GlobeIcon} />
            <NavText>{t('Nav.sessions')}</NavText>
          </RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink
            to="/storage"
            className={NavLink.className}
            activeClassName={NavLink.activeClassName}
          >
            <NavIcon icon={ArchiveIcon} />
            <NavText>{t('Nav.storage')}</NavText>
          </RouterLink>
        </NavItem>
        {flag('settings.permissions-dashboard') && (
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
        )}
      </Nav>
    </UISidebar>
  )
}

export default Sidebar
