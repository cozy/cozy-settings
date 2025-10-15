import React, { useState, useRef } from 'react'

import { useQuery, useClient } from 'cozy-client'
import Avatar from 'cozy-ui/transpiled/react/Avatar'
import Badge from 'cozy-ui/transpiled/react/Badge'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import CameraIcon from 'cozy-ui/transpiled/react/Icons/Camera'
import PenIcon from 'cozy-ui/transpiled/react/Icons/Pen'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'

import { useAvatar } from './AvatarContext'

import { buildSettingsInstanceQuery } from '@/lib/queries'

const AvatarMenu = ({
  fileInputRef,
  anchorRef,
  avatarStatus,
  setShowMenu,
  setAvatarStatus,
  setAvatarTimestamp
}) => {
  const { t } = useI18n()
  const client = useClient()
  const { showAlert } = useAlert()
  const { deleteAvatar } = useAvatar()

  const handleUpdateAvatar = () => {
    setShowMenu(false)
    fileInputRef.current.click()
  }

  const handleDeleteAvatar = async () => {
    setShowMenu(false)

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
  )
}

const AvatarWrapper = ({ avatarStatus, setAvatarStatus, avatarTimestamp }) => {
  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance } = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )
  const client = useClient()
  const rootURL = client.getStackClient().uri

  if (avatarStatus === 'LOADING') {
    return (
      <>
        <Avatar className="u-o-50" size={94} />
        <Spinner className="u-m-0" middle size="large" />
      </>
    )
  }

  const alt = instance?.public_name || 'Avatar'

  if (avatarStatus === 'PRESENT') {
    return (
      <Avatar
        key={avatarTimestamp}
        size={94}
        src={`${rootURL}/public/avatar?t=${avatarTimestamp}&fallback=initials`}
        alt={alt}
        onError={() => {
          setAvatarStatus('ABSENT')
        }}
      />
    )
  }

  return <Avatar key={avatarTimestamp} size={94} alt={alt} />
}

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
