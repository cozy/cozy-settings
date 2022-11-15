import { useCallback } from 'react'

import { isFlagshipApp } from 'cozy-device-helper'
import { useClient } from 'cozy-client'
import { useWebviewIntent } from 'cozy-intent'

export const useLogout = (): (() => void) => {
  const client = useClient()
  const webviewIntent = useWebviewIntent()

  const logoutAndForget = useCallback(() => {
    const doLogout = async (): Promise<boolean | void | null> => {
      await client.logout()

      return isFlagshipApp() && webviewIntent
        ? webviewIntent.call('logout')
        : window.location.reload()
    }

    return void doLogout()
  }, [client, webviewIntent])

  return logoutAndForget
}
