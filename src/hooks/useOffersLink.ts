import { useEffect, useState } from 'react'
import CozyClient, { useClient, Q } from 'cozy-client'
import logger from 'lib/logger'

const warn = (logger as unknown as { warn: (...args: unknown[]) => void }).warn

interface QueryResult<T> {
  data: { attributes: T }
}
type ExpectedContext = QueryResult<{
  manager_url?: string
  enable_premium_links?: boolean
}>
type ExpectedInstance = QueryResult<{ uuid?: string }>

export const useOffersLink = (): undefined | string | null => {
  const client = useClient()
  const [offersLink, setOffersLink] = useState<undefined | string | null>()

  useEffect(() => {
    const asyncCore = async (): Promise<void> => {
      try {
        const [{ data: context }, { data: instance }] = await Promise.all([
          (await client.fetchQueryAndGetFromState({
            definition: Q('io.cozy.settings').getById('context'),
            options: {
              fetchPolicy: CozyClient.fetchPolicies.olderThan(3000 * 1000)
            }
          })) as ExpectedContext,
          (await client.fetchQueryAndGetFromState({
            definition: Q('io.cozy.settings').getById('instance'),
            options: {
              fetchPolicy: CozyClient.fetchPolicies.olderThan(3000 * 1000)
            }
          })) as ExpectedInstance
        ])
        const { manager_url, enable_premium_links } = context.attributes
        const { uuid } = instance.attributes

        setOffersLink(
          enable_premium_links && manager_url && uuid
            ? `${manager_url}/cozy/instances/${uuid}/premium`
            : null
        )
      } catch (error) {
        warn('Error while fetching offers link', error)
      }
    }

    offersLink === undefined && asyncCore()
  }, [client, offersLink])

  return offersLink
}
