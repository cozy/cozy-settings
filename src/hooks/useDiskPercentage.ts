import { useEffect, useState } from 'react'

import { useClient, Q } from 'cozy-client'

import logger from 'lib/logger'
import { makeDiskInfos } from 'lib/makeDiskInfos'

const warn = (logger as unknown as { warn: (...args: unknown[]) => void }).warn

interface ExpectedData {
  data: { attributes: { used: string; quota: string } }
}

export const useDiskPercentage = (): string | undefined => {
  const client = useClient()
  const [percent, setPercent] = useState<undefined | string>()

  useEffect(() => {
    const asyncCore = async (): Promise<void> => {
      try {
        const { data } = (await client.query(
          Q('io.cozy.settings').getById('disk-usage')
        )) as ExpectedData

        setPercent(
          makeDiskInfos(data.attributes.used, data.attributes.quota)
            .percentUsage
        )
      } catch (error) {
        warn('Error while fetching disk usage', error)
      }
    }

    !percent && asyncCore()
  }, [client, percent])

  return percent
}
