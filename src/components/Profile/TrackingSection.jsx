import React from 'react'

import { useQuery, useMutation } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Input from 'components/Input'
import { buildSettingsInstanceQuery } from 'lib/queries'

export const TrackingSection = () => {
  const { t } = useI18n()
  const { mutate, mutationStatus } = useMutation()

  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance } = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  const handleChange = (_, value) => {
    mutate({
      _rev: instance.meta.rev,
      ...instance,
      attributes: {
        ...instance.attributes,
        tracking: value
      }
    })
  }

  return (
    <Input
      name="tracking"
      type="checkbox"
      title={t('ProfileView.tracking.title')}
      label={t('ProfileView.tracking.label', {
        version: instance?.tos ? `-${instance.tos}` : '-201711'
      })}
      value={Boolean(instance.tracking)}
      onChange={handleChange}
      submitting={mutationStatus === 'loading'}
      saved={mutationStatus === 'loaded'}
      errors={
        mutationStatus === 'failed' ? ['ProfileView.infos.server_error'] : []
      }
    />
  )
}

export default TrackingSection
