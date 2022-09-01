import { useEffect, useState } from 'react'
import { useClient, Q } from 'cozy-client'
import logger from 'lib/logger'

const warn = (logger as { warn: (...args: unknown[]) => void }).warn

type QueryResult<T> = { data: { attributes: T } }
type ExpectedContext = QueryResult<{
  manager_url?: string
  enable_premium_links?: string
}>
type ExpectedInstance = QueryResult<{ uuid?: string }>

export const useOffersLink = (): undefined | string | null => {
  const client = useClient()
  const [offersLink, setOffersLink] = useState<undefined | string | null>()

  useEffect(() => {
    const asyncCore = async (): Promise<void> => {
      try {
        const { data: context } = (await client.query(
          Q('io.cozy.settings').getById('context')
        )) as ExpectedContext

        const { data: instance } = (await client.query(
          Q('io.cozy.settings').getById('instance')
        )) as ExpectedInstance

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

    offersLink === undefined && client && asyncCore()
  }, [client, offersLink])

  return offersLink
}
