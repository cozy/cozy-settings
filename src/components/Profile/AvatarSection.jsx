import React, { useState, useRef } from 'react'
import { useQuery, useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Avatar from 'cozy-ui/transpiled/react/Avatar'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import PenIcon from 'cozy-ui/transpiled/react/Icons/Pen'
import CameraIcon from 'cozy-ui/transpiled/react/Icons/Camera'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { buildSettingsInstanceQuery } from '@/lib/queries'
import { useAvatar } from './AvatarContext'

const AvatarSection = () => {
  const { t } = useI18n()
  const { showAlert } = useAlert()
  const { uploadAvatar, deleteAvatar } = useAvatar()
  const [showMenu, setShowMenu] = useState(false)
  const [avatarStatus, setAvatarStatus] = useState('PRESENT')
  const [avatarTimestamp, setAvatarTimestamp] = useState(Date.now())

  const fileInputRef = useRef(null)
  const menuAnchorRef = useRef(null)
  const client = useClient()
  const rootURL = client.getStackClient().uri

  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance } = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

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

  const handleUpdateAvatar = () => {
    setShowMenu(false)
    fileInputRef.current.click()
  }

  const toggleMenu = () => {
    setShowMenu(prev => !prev)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  const handleDeleteAvatar = async () => {
    closeMenu()

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)
    const previousAvatarStatus = avatarStatus
    setAvatarStatus('LOADING')

    try {
      await deleteAvatar(client)
      clearTimeout(timeoutId)

      const checkTimestamp = Date.now()

      setAvatarStatus('ABSENT')
      setAvatarTimestamp(checkTimestamp)
      showAlert({
        message: t('AvatarSection.success.deleted', 'Avatar deleted'),
        type: 'success'
      })
    } catch (error) {
      clearTimeout(timeoutId)
      setAvatarStatus(previousAvatarStatus)
      showAlert({
        message: t('AvatarSection.error.deleteFailed'),
        type: 'error'
      })
    }
  }

  return (
    <div>
      <div className="u-mv-1-half">
        <div className="avatar-container">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />

          <div className="avatar">
            {(() => {
              const commonAvatarProps = {
                size: 'xl',
                style: { width: '94px', height: '94px' }
              }

              if (avatarStatus === 'LOADING') {
                return (
                  <div className="avatar-loading-container">
                    <Avatar
                      {...commonAvatarProps}
                      style={{ ...commonAvatarProps.style, opacity: '0.5' }}
                    />
                    <Spinner className="avatar-spinner" size="large" />
                  </div>
                )
              }

              const additionalProps = {
                alt: instance?.public_name || 'Avatar',
                key: avatarTimestamp,
                onError: () => {
                  if (avatarStatus === 'PRESENT') {
                    setAvatarStatus('ABSENT')
                  }
                }
              }

              if (avatarStatus === 'PRESENT') {
                additionalProps.src = `${rootURL}/public/avatar?t=${avatarTimestamp}&fallback=404`
              }

              return <Avatar {...commonAvatarProps} {...additionalProps} />
            })()}
          </div>

          <div className="edit-button-container" ref={menuAnchorRef}>
            <IconButton onClick={toggleMenu} size="medium">
              <Icon icon={PenIcon} />
            </IconButton>

            <Menu
              open={showMenu}
              anchorEl={menuAnchorRef.current}
              onClose={closeMenu}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
            >
              <MenuItem onClick={handleUpdateAvatar}>
                <ListItemIcon>
                  <Icon icon={CameraIcon} />
                </ListItemIcon>
                <ListItemText
                  primary={t('AvatarSection.menu.update', 'Update avatar')}
                />
              </MenuItem>
              <MenuItem onClick={handleDeleteAvatar}>
                <ListItemIcon>
                  <Icon icon={TrashIcon} />
                </ListItemIcon>
                <ListItemText
                  primary={t('AvatarSection.menu.delete', 'Delete avatar')}
                />
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvatarSection
