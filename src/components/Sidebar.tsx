import React from 'react'

import DevicesIcon from 'cozy-ui/transpiled/react/Icons/Devices'
import GlobeIcon from 'cozy-ui/transpiled/react/Icons/Globe'
import GraphCircle from 'cozy-ui/transpiled/react/Icons/GraphCircle'
import HandIcon from 'cozy-ui/transpiled/react/Icons/Hand'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import Logout from 'cozy-ui/transpiled/react/Icons/Logout'
import PeopleIcon from 'cozy-ui/transpiled/react/Icons/People'
import UnknowIcon from 'cozy-ui/transpiled/react/Icons/Unknow'
import flag from 'cozy-flags'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { MenuItemAnchor } from 'components/menu/MenuItemAnchor'
import { MenuItemButton } from 'components/menu/MenuItemButton'
import { MenuItemNavLink } from 'components/menu/MenuItemNavLink'
import { MenuList } from 'components/menu/MenuList'
import { isFlagshipApp } from 'cozy-device-helper'
import { routes } from 'constants/routes'
import { useDiskPercentage } from 'hooks/useDiskPercentage'
import { useLogout } from 'hooks/useLogout'
import { useOffersLink } from 'hooks/useOffersLink'

export const Sidebar = (): JSX.Element => {
  const { t } = useI18n()
  const percent = useDiskPercentage()
  const logout = useLogout()
  const offersLink = useOffersLink()

  return (
    <nav role="navigation">
      <List>
        {isFlagshipApp() ||
          (flag('settings.flagship-mode') && (
            <MenuList title={t('Nav.header_flagship')}>
              <MenuItemNavLink
                to={routes.lockScreen}
                primary={t('Nav.primary_lock_screen')}
                icon={PeopleIcon} // @todo icon
              />
            </MenuList>
          ))}

        <MenuList title={t('Nav.header_general')}>
          <MenuItemNavLink
            to={routes.profile}
            primary={t('Nav.profile')}
            icon={PeopleIcon}
          />

          {flag('settings.enable_premium_links') && offersLink && (
            <MenuItemAnchor
              primary={t('Nav.primary_plan')}
              href={offersLink}
              target="_blank"
              icon={UnknowIcon}
            />
          )}

          <MenuItemNavLink
            to={routes.connectedDevices}
            primary={t('Nav.connected_devices')}
            icon={DevicesIcon}
          />

          <MenuItemNavLink
            to={routes.sessions}
            primary={t('Nav.sessions')}
            icon={GlobeIcon}
          />

          <MenuItemNavLink
            to={routes.storage}
            primary={t('Nav.storage')}
            secondary={
              percent &&
              t('Nav.secondary_used', {
                percent
              })
            }
            icon={GraphCircle}
          />

          {flag('settings.permissions-dashboard') && (
            <MenuItemNavLink
              to={routes.appList}
              primary={t('Nav.permissions')}
              icon={HandIcon}
            />
          )}
        </MenuList>

        <MenuList title={t('Nav.header_other')}>
          <MenuItemAnchor
            primary={t('Nav.primary_faq')}
            href={routes.external_faq}
            target="_blank"
            icon={UnknowIcon}
          />

          <MenuItemButton
            primary={t('Nav.primary_logout')}
            icon={Logout}
            onClick={(): void => void logout()}
          />
        </MenuList>
      </List>
    </nav>
  )
}

export default Sidebar
