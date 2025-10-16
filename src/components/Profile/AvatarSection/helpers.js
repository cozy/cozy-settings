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
