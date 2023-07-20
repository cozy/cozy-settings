import { useEffect, useRef } from 'react'
import { useWebviewIntent } from 'cozy-intent'
import logger from 'lib/logger'

export const useSetLang = (selectedLocale?: string | null): void => {
  const webviewIntent = useWebviewIntent()
  const prevLocale = useRef<undefined | string>()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false // First render has been done
    } else if (
      selectedLocale !== undefined &&
      selectedLocale !== null &&
      selectedLocale !== prevLocale.current &&
      webviewIntent
    ) {
      webviewIntent
        .call('setLang', selectedLocale)
        .then(() => {
          prevLocale.current = selectedLocale
          return { selectedLocale }
        })
        .catch(error => {
          logger.error('Failed to set locale on Flagship app', error)
        })
    }
  }, [selectedLocale, webviewIntent])
}
