import React from 'react'

import DevicesIcon from 'cozy-ui/transpiled/react/Icons/Devices'
import GlobeIcon from 'cozy-ui/transpiled/react/Icons/Globe'
import PaletteIcon from 'cozy-ui/transpiled/react/Icons/Palette'
import GraphCircle from 'cozy-ui/transpiled/react/Icons/GraphCircle'
import HandIcon from 'cozy-ui/transpiled/react/Icons/Hand'
import HelpIcon from 'cozy-ui/transpiled/react/Icons/Help'
import LockScreen from 'cozy-ui/transpiled/react/Icons/LockScreen'
import Logout from 'cozy-ui/transpiled/react/Icons/Logout'
import PeopleIcon from 'cozy-ui/transpiled/react/Icons/People'
import EmailIcon from 'cozy-ui/transpiled/react/Icons/Email'
import Typography from 'cozy-ui/transpiled/react/Typography'
import flag from 'cozy-flags'
import ContractIcon from 'cozy-ui/transpiled/react/Icons/Contract'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useInstanceInfo } from 'cozy-client'
import JusticeIcon from 'cozy-ui/transpiled/react/Icons/Justice'

import styles from 'components/Sidebar.styl'
import { MenuItemAnchor } from 'components/menu/MenuItemAnchor'
import { MenuItemButton } from 'components/menu/MenuItemButton'
import { MenuItemNavLink } from 'components/menu/MenuItemNavLink'
import { MenuList } from 'components/menu/MenuList'
import { isFlagshipApp } from 'cozy-device-helper'
import { routes } from 'constants/routes'
import { useDiskPercentage } from 'hooks/useDiskPercentage'
import { useLogout } from 'hooks/useLogout'
import { SubscriptionMenuItem } from 'components/Subscription/SubscriptionMenuItem'

export const Sidebar = (): JSX.Element => {
  const logout = useLogout()
  const percent = useDiskPercentage()
  const { t } = useI18n()

  const { instance } = useInstanceInfo()

  return (
    <nav role="navigation" className={styles.Sidebar}>
      {(isFlagshipApp() || flag('settings.flagship-mode')) && (
        <MenuList title={t('Nav.header_flagship')}>
          <MenuItemNavLink
            to={routes.lockScreen}
            primary={t('Nav.primary_lock_screen')}
            icon={LockScreen}
          />
        </MenuList>
      )}

      <MenuList title={t('Nav.header_general')}>
        <MenuItemNavLink
          to={routes.profile}
          primary={t('Nav.profile')}
          icon={PeopleIcon}
        />
        <MenuItemNavLink
          to={routes.appearance}
          primary={t('Nav.appearance')}
          icon={PaletteIcon}
        />
        <SubscriptionMenuItem />
        <MenuItemNavLink
          to={routes.storage}
          primary={t('Nav.storage')}
          beforeEnd={
            percent ? (
              <Typography
                variant="body2"
                className="u-mr-half"
                style={{ color: 'var(--secondaryTextColor)' }}
              >
                {t('Nav.secondary_used', { percent })}
              </Typography>
            ) : null
          }
          icon={GraphCircle}
        />
      </MenuList>

      <MenuList title={t('Nav.header_data')}>
        {flag('settings.permissions-dashboard') && (
          <MenuItemNavLink
            to={routes.appList}
            primary={t('Nav.permissions')}
            icon={HandIcon}
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
      </MenuList>

      <MenuList title={t('Nav.header_other')}>
        <MenuItemAnchor
          primary={t('Nav.primary_faq')}
          href={routes.external_faq}
          target="_blank"
          icon={HelpIcon}
        />
        <MenuItemNavLink
          to={routes.support}
          primary={t('Nav.contact_support')}
          icon={EmailIcon}
        />
        {instance.data.legal_notice_url && (
          <MenuItemAnchor
            primary={t('Nav.legal_notice')}
            href={instance.data.legal_notice_url}
            target="_blank"
            icon={JusticeIcon}
          />
        )}
        <MenuItemAnchor
          primary={t('Nav.terms_of_service')}
          href={`https://files.cozycloud.cc/TOS${
            instance.data.tos ? `-${instance.data.tos}` : '-201711'
          }.pdf`}
          target="_blank"
          icon={ContractIcon}
        />
        <MenuItemButton
          primary={t('Nav.primary_logout')}
          icon={Logout}
          onClick={(): void => void logout()}
        />
      </MenuList>
    </nav>
  )
}

export default Sidebar
