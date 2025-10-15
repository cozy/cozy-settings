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

const AvatarSection = () => {
  const { t } = useI18n()
  const { showAlert } = useAlert()
  const { uploadAvatar } = useAvatar()
  const [showMenu, setShowMenu] = useState(false)
  const [avatarStatus, setAvatarStatus] = useState('PRESENT') // PRESENT || ABSENT || LOADING
  const [avatarTimestamp, setAvatarTimestamp] = useState(Date.now())

  const fileInputRef = useRef(null)
  const menuAnchorRef = useRef(null)
  const client = useClient()

  const handleFileChange = async event => {
    const file = event.target.files[0]
    if (!file) return

    const MAX_FILE_SIZE = 5 * 1024 * 1024
    if (file.size > MAX_FILE_SIZE) {
      showAlert({
        message: t('AvatarSection.error.fileSizeLimit'),
        type: 'error'
      })
      return
    }

    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!ALLOWED_TYPES.includes(file.type)) {
      showAlert({
        message: t('AvatarSection.error.fileType'),
        type: 'error'
      })
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const previousAvatarStatus = avatarStatus
    setAvatarStatus('LOADING')

    try {
      await uploadAvatar(client, file)
      clearTimeout(timeoutId)

      const newTimestamp = Date.now()
      setAvatarStatus('PRESENT')
      setAvatarTimestamp(newTimestamp)
      showAlert({
        message: t('AvatarSection.success.updated', 'Updated successful'),
        type: 'success'
      })
    } catch (error) {
      clearTimeout(timeoutId)
      setAvatarStatus(previousAvatarStatus)
      showAlert({
        message: t(
          'AvatarSection.error.uploadFailed',
          'Upload failed. Please try again.'
        ),
        type: 'error'
      })
    } finally {
      setShowMenu(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

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
        onChange={handleFileChange}
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
