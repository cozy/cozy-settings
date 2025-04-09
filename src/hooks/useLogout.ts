import { useCallback } from 'react'

import { useClient } from 'cozy-client'
import { isFlagshipApp } from 'cozy-device-helper'
import { useWebviewIntent } from 'cozy-intent'

export const useLogout = (): (() => Promise<void>) => {
  const client = useClient()
  const webviewIntent = useWebviewIntent()

  const logout = useCallback(async () => {
    await client.logout()

    return isFlagshipApp() && webviewIntent
      ? webviewIntent.call('logout')
      : window.location.reload()
  }, [client, webviewIntent])

  return logout
}
