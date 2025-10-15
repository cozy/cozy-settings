import React, { useState, useRef } from 'react'

import { useClient } from 'cozy-client'
import Badge from 'cozy-ui/transpiled/react/Badge'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PenIcon from 'cozy-ui/transpiled/react/Icons/Pen'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'

import { useAvatar } from './AvatarContext'
import AvatarMenu from './AvatarMenu'
import AvatarWrapper from './AvatarWrapper'
import { handleFileChange } from './helpers'

const AvatarSection = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [avatarStatus, setAvatarStatus] = useState('PRESENT') // PRESENT || ABSENT || LOADING
  const [avatarTimestamp, setAvatarTimestamp] = useState(Date.now())
  const client = useClient()
  const { t } = useI18n()
  const { showAlert } = useAlert()
  const { uploadAvatar } = useAvatar()

  const fileInputRef = useRef(null)
  const menuAnchorRef = useRef(null)

  const toggleMenu = () => {
    setShowMenu(prev => !prev)
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={event =>
          handleFileChange({
            event,
            client,
            t,
            fileInputRef,
            avatarStatus,
            uploadAvatar,
            setAvatarStatus,
            setAvatarTimestamp,
            setShowMenu,
            showAlert
          })
        }
      />
      <Badge
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        badgeContent={
          <>
            <Button
              ref={menuAnchorRef}
              component="div"
              className="u-miw-auto u-w-2-half u-h-2-half u-bdrs-circle"
              classes={{ label: 'u-flex u-w-auto' }}
              style={{
                outline: '4px solid var(--paperBackgroundColor)'
              }}
              label={<Icon icon={PenIcon} />}
              size="small"
              onClick={toggleMenu}
            />
            {showMenu && (
              <AvatarMenu
                fileInputRef={fileInputRef}
                anchorRef={menuAnchorRef.current}
                avatarStatus={avatarStatus}
                setShowMenu={setShowMenu}
                setAvatarStatus={setAvatarStatus}
                setAvatarTimestamp={setAvatarTimestamp}
              />
            )}
          </>
        }
      >
        <AvatarWrapper
          avatarStatus={avatarStatus}
          setAvatarStatus={setAvatarStatus}
          avatarTimestamp={avatarTimestamp}
        />
      </Badge>
    </>
  )
}

export default AvatarSection
