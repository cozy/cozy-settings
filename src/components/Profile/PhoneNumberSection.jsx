import React from 'react'

import { useQuery } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Stack from 'cozy-ui/transpiled/react/Stack'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Input from '@/components/Input'
import { buildSettingsInstanceQuery } from '@/lib/queries'

const PhoneNumberSection = () => {
  const { t } = useI18n()

  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance } = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )
  return (
    <Stack spacing="m">
      <Input
        name="phone_number"
        type="tel"
        title={t('ProfileView.phone_number.title')}
        label={t(`ProfileView.phone_number.label`)}
        value={instance?.phone_number || '+0000000000 (to be implemented)'}
        copyable={true}
      />
      <Button
        variant="secondary"
        size="medium"
        label={t('ProfileView.phone_number.change_button')}
        href="https://sign-up.twake.app/"
        disabled
      />
    </Stack>
  )
}

export { PhoneNumberSection }
