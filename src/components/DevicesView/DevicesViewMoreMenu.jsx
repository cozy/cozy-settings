import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import DotsIcon from 'cozy-ui/transpiled/react/Icons/Dots'
import ActionMenu, {
  ActionMenuHeader,
  ActionMenuItem
} from 'cozy-ui/transpiled/react/ActionMenu'
import Typography from 'cozy-ui/transpiled/react/Typography'
import React, { useCallback, useState } from 'react'
import tableStyles from '../../styles/table.styl'
import { Bd, Img, Media } from 'cozy-ui/transpiled/react/Media'
import SyncIcon from 'cozy-ui/transpiled/react/Icons/Sync'
import GearIcon from 'cozy-ui/transpiled/react/Icons/Gear'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'
import { canConfigureDevice, getDeviceIcon } from './helpers'

const MoreButton = ({ onClick }) => {
  const { t } = useI18n()
  return (
    <IconButton
      theme="secondary"
      extension="narrow"
      size="small"
      label={t('Toolbar.more')}
      onClick={onClick}
    >
      <Icon icon={DotsIcon} />
    </IconButton>
  )
}
const MoreMenuItem = ({ onClick, icon, color, text, className }) => (
  <ActionMenuItem
    className={className}
    onClick={onClick}
    left={<Icon icon={icon} color={`var(--${color}Color)`} />}
  >
    <Typography
      variant="body1"
      color={color}
      style={{
        textTransform: 'capitalize'
      }}
      className="u-ml-half"
    >
      {text}
    </Typography>
  </ActionMenuItem>
)
const MoreMenu = ({ device, onRevoke, onConfigure, isMobile }) => {
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
      <MoreButton onClick={toggleMenu} />
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
            <MoreMenuItem
              className={tableStyles['action-menu-item']}
              onClick={onConfigure}
              icon={GearIcon}
              text={t('DevicesView.configure')}
            />
          ) : null}
          <MoreMenuItem
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
export default MoreMenu
