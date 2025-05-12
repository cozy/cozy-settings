import React from 'react'

import { useQuery } from 'cozy-client'
import Stack from 'cozy-ui/transpiled/react/Stack'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Input from '@/components/Input'
import { buildSettingsInstanceQuery } from '@/lib/queries'

const MatrixIdSection = () => {
  const { t } = useI18n()

  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance } = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  return (
    <Stack spacing="m">
      <Input
        name="matrix_id"
        type="text"
        title={t('ProfileView.matrix_id.title')}
        label={t(`ProfileView.matrix_id.label`)}
        value={
          instance?.matrix_id || 'example:linagora.com (to be implemented)'
        }
        copyable={true}
      />
    </Stack>
  )
}

export { MatrixIdSection }
