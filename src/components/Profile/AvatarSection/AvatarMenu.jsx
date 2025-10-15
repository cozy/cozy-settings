import React, { useRef } from 'react'

import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import CameraIcon from 'cozy-ui/transpiled/react/Icons/Camera'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'

import { handleDeleteAvatar, handleUploadAvatar } from './helpers'

const AvatarMenu = ({
  anchorRef,
  avatarStatus,
  showMenu,
  setShowMenu,
  setAvatarStatus,
  setAvatarTimestamp,
  onUpload,
  onDelete
}) => {
  const { t } = useI18n()
  const client = useClient()
  const { showAlert } = useAlert()

  const fileInputRef = useRef(null)

  return (
    <>
      <input
        className="u-dn"
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={event =>
          handleUploadAvatar({
            event,
            client,
            t,
            fileInputRef,
            avatarStatus,
            onUpload,
            setAvatarStatus,
            setAvatarTimestamp,
            setShowMenu,
            showAlert
          })
        }
      />
      {showMenu && (
        <Menu
          open
          anchorEl={anchorRef}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={() => setShowMenu(false)}
        >
          <MenuItem
            onClick={() => {
              setShowMenu(false)
              fileInputRef.current.click() // triggers onChange of the input
            }}
          >
            <ListItemIcon>
              <Icon icon={CameraIcon} />
            </ListItemIcon>
            <ListItemText
              primary={t('AvatarSection.menu.update', 'Update avatar')}
            />
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleDeleteAvatar({
                client,
                t,
                avatarStatus,
                onDelete,
                setShowMenu,
                setAvatarStatus,
                setAvatarTimestamp,
                showAlert
              })
            }
          >
            <ListItemIcon>
              <Icon icon={TrashIcon} />
            </ListItemIcon>
            <ListItemText
              primary={t('AvatarSection.menu.delete', 'Delete avatar')}
            />
          </MenuItem>
        </Menu>
      )}
    </>
  )
}

export default AvatarMenu
