const MAX_FILE_SIZE = 5 * 1024 * 1024

export const handleUploadAvatar = async ({
  event,
  t,
  fileInputRef,
  avatarStatus,
  uploadAvatar,
  setAvatarStatus,
  setAvatarTimestamp,
  setShowMenu,
  showAlert
}) => {
  const file = event.target.files[0]
  if (!file) return

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
    await uploadAvatar(file)
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

export const handleDeleteAvatar = async ({
  t,
  avatarStatus,
  deleteAvatar,
  setShowMenu,
  setAvatarStatus,
  setAvatarTimestamp,
  showAlert
}) => {
  setShowMenu(false)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)
  const previousAvatarStatus = avatarStatus
  setAvatarStatus('LOADING')

  try {
    await deleteAvatar()
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

export const uploadAvatar = async (client, file) => {
  const uploadResponse = await client.fetch('PUT', '/settings/avatar', file, {
    headers: { 'Content-Type': file.type }
  })

  if (!uploadResponse.ok) {
    const errorData = {
      status: uploadResponse.status,
      message: `Upload failed with status ${uploadResponse.status}`,
      response: uploadResponse
    }
    throw errorData
  }

  return uploadResponse
}

export const deleteAvatar = async client => {
  const deleteResponse = await client
    .getStackClient()
    .fetchJSON('DELETE', '/settings/avatar')

  return deleteResponse
}
