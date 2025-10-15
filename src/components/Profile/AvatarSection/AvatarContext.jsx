import React, { createContext, useContext } from 'react'

const AvatarContext = createContext()

export const AvatarProvider = ({ children }) => {
  const uploadAvatar = async (client, file) => {
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

  const deleteAvatar = async client => {
    const deleteResponse = await client
      .getStackClient()
      .fetchJSON('DELETE', '/settings/avatar')

    return deleteResponse
  }

  const value = {
    uploadAvatar,
    deleteAvatar
  }

  return (
    <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>
  )
}

export const useAvatar = () => {
  const context = useContext(AvatarContext)
  if (context === undefined) {
    throw new Error('useAvatar must be used within an AvatarProvider')
  }
  return context
}
