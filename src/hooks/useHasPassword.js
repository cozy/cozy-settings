import { useEffect, useState } from 'react'

import { useClient } from 'cozy-client'
import { hasPassword as computeHasPassword } from 'cozy-client/dist/models/user'

import { SETTINGS_DOCTYPE } from '@/doctypes'

export const useHasPassword = () => {
  const client = useClient()

  const [hasPassword, setHasPassword] = useState()
  const [isComputing, setIsComputing] = useState(true)

  const handlePassphraseCreated = settings => {
    if (settings._id === 'io.cozy.settings.passphrase') {
      setHasPassword(true)
    }
  }

  useEffect(() => {
    client.plugins.realtime.subscribe(
      'created',
      SETTINGS_DOCTYPE,
      handlePassphraseCreated
    )
    return () => {
      client.plugins.realtime.unsubscribe(
        'created',
        SETTINGS_DOCTYPE,
        handlePassphraseCreated
      )
    }
  }, [client.plugins.realtime])

  useEffect(() => {
    const compute = async () => {
      setHasPassword(await computeHasPassword(client))
      setIsComputing(false)
    }
    compute()
  }, [client])

  return { hasPassword, isComputing }
}
