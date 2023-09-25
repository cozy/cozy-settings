import React, { useCallback, useState } from 'react'

import ActionMenu, {
  ActionMenuHeader
} from 'cozy-ui/transpiled/react/deprecated/ActionMenu'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'
import Typography from 'cozy-ui/transpiled/react/Typography'
import GearIcon from 'cozy-ui/transpiled/react/Icons/Gear'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/deprecated/Media'
import SyncIcon from 'cozy-ui/transpiled/react/Icons/Sync'

import { DevicesMoreButton } from 'components/Devices/DevicesMoreButton'
import { DevicesMoreMenuItem } from 'components/Devices/DevicesMoreMenuItem'
import { getDeviceIcon, canConfigureDevice } from 'components/Devices/helpers'
import tableStyles from 'styles/table.styl'

const DevicesMoreMenu = ({ device, onRevoke, onConfigure, isMobile }) => {
  const { f, t } = useI18n()

  const [menuIsVisible, setMenuVisible] = useState(false)

  const openMenu = useCallback(() => setMenuVisible(true), [setMenuVisible])
  const closeMenu = useCallback(() => setMenuVisible(false), [setMenuVisible])
  const toggleMenu = useCallback(() => {
    if (menuIsVisible) return closeMenu()
    openMenu()
  }, [closeMenu, openMenu, menuIsVisible])
  return (
    <>
      <DevicesMoreButton onClick={toggleMenu} />
      {isMobile && menuIsVisible ? (
        <ActionMenu onClose={closeMenu} autoclose>
          <ActionMenuHeader className={tableStyles['action-menu-header']}>
            <Media>
              <Img>
                <Icon icon={getDeviceIcon(device)} size={32} />
              </Img>
              <Bd className="u-ml-1">
                <Typography variant="h6">{device.client_name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  <Icon
                    icon={SyncIcon}
                    size={8}
                    color="var(--secondaryTextColor)"
                  />
                  {/* eslint-disable-next-line no-irregular-whitespace */}
                  <span className={tableStyles['more-menu-infos']}>
                    {device.synchronized_at
                      ? f(
                          device.synchronized_at,
                          t('DevicesView.sync_date_format')
                        )
                      : '-'}
                  </span>
                </Typography>
              </Bd>
            </Media>
          </ActionMenuHeader>
          {canConfigureDevice(device) ? (
            <DevicesMoreMenuItem
              className={tableStyles['action-menu-item']}
              onClick={onConfigure}
              icon={GearIcon}
              text={t('DevicesView.configure')}
            />
          ) : null}
          <DevicesMoreMenuItem
            className={tableStyles['action-menu-item']}
            onClick={onRevoke}
            icon={TrashIcon}
            color="error"
            text={t('DevicesView.revoke')}
          />
        </ActionMenu>
      ) : null}
    </>
  )
}

export { DevicesMoreMenu }
