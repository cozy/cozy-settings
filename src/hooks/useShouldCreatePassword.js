import { hasQueryBeenLoaded, useQuery } from 'cozy-client'
import { useEffect, useState } from 'react'

import { useCanAuthWith } from 'hooks/useCanAuthWith'
import { buildSettingsInstanceQuery } from 'lib/queries'

export const useShouldCreatePassword = () => {
  const { canAuthWithOIDC, canAuthWithMagicLinks } = useCanAuthWith()

  const instanceQuery = buildSettingsInstanceQuery()
  const instanceResult = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  const [shouldCreatePassword, setShouldCreatePassword] = useState(undefined)

  useEffect(() => {
    if (hasQueryBeenLoaded(instanceResult)) {
      const result =
        (canAuthWithOIDC || canAuthWithMagicLinks) &&
        !instanceResult.data.attributes.password_defined
      setShouldCreatePassword(result)
    }
  }, [canAuthWithOIDC, canAuthWithMagicLinks, instanceResult])

  return shouldCreatePassword
}
