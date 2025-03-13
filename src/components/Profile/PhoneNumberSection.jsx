import React, { useMemo, useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useQuery, useMutation } from 'cozy-client'

import Input from 'components/Input'
import { buildSettingsInstanceQuery } from 'lib/queries'
import { validatePhoneNumber } from 'lib/phoneHelper'

const PhoneNumberSection = () => {
  const { t } = useI18n()

  const { mutate, mutationStatus } = useMutation()
  const [formError, setFormError] = useState()

  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance } = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  const handleBlur = (_, value) => {
    if (value !== '') {
      mutate({
        _rev: instance.meta.rev,
        ...instance,
        attributes: {
          ...instance.attributes,
          phone_number: value
        }
      })
    }
  }

  const errors = useMemo(() => {
    if (mutationStatus === 'failed') {
      return ['ProfileView.infos.server_error']
    }
    if (formError) {
      return [formError]
    }
    return undefined
  }, [mutationStatus, formError])

  const handleChange = (_, value) => {
    if (value === '') {
      setFormError(undefined)
    } else if (!validatePhoneNumber(value)) {
      setFormError('ProfileView.phone_number.invalid')
    } else {
      setFormError(undefined)
    }
  }

  return (
    <Input
      name="phone_number"
      type="tel"
      title={t('ProfileView.phone_number.title')}
      label={t(`ProfileView.phone_number.label`)}
      value={instance?.phone_number || ''}
      onBlur={handleBlur}
      onChange={handleChange}
      submitting={mutationStatus === 'loading'}
      saved={mutationStatus === 'loaded'}
      errors={errors}
    />
  )
}

export { PhoneNumberSection }
