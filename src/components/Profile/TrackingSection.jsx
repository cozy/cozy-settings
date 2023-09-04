import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Input from 'components/Input'

export const TrackingSection = ({ instance, fields, onChange }) => {
  const { t } = useI18n()

  return (
    <Input
      name="tracking"
      type="checkbox"
      title={t('ProfileView.tracking.title')}
      label={t('ProfileView.tracking.label', {
        version:
          instance && instance.data.attributes.tos
            ? `-${instance.data.attributes.tos}`
            : '-201711'
      })}
      {...fields.tracking}
      onChange={onChange}
    />
  )
}

export default TrackingSection
