import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import {
  useQuery,
  hasQueryBeenLoaded,
  deconstructRedirectLink
} from 'cozy-client'

import Select from 'components/Select'
import { buildAppsQuery } from 'lib/queries'

const EXCLUDED_SLUGS = ['settings', 'store', 'home']

const formatOptions = (appsResult, t) => {
  if (!hasQueryBeenLoaded(appsResult)) return []

  const renamedHome = {
    slug: 'home',
    name: t('ProfileView.default_redirection.app_list')
  }

  const filteredApps = appsResult.data.filter(
    ({ slug }) => !EXCLUDED_SLUGS.includes(slug)
  )

  return [renamedHome, ...filteredApps]
}

const getSelectedOption = (defautRedirection, options, t) => {
  try {
    const { slug } = deconstructRedirectLink(defautRedirection)
    const { name } = options.find(option => option.slug === slug)

    return {
      value: slug,
      label: name
    }
  } catch {
    return {
      value: 'home',
      label: t('ProfileView.default_redirection.app_list')
    }
  }
}

const formatDefaultRedirection = slug => `${slug}/`

const DefaultRedirectionSection = props => {
  const { t } = useI18n()
  const appsQuery = buildAppsQuery()
  const appsResult = useQuery(appsQuery.definition, appsQuery.options)

  const options = formatOptions(appsResult, t)

  const { fields, onChange } = props
  const fieldProps = {
    ...fields.default_redirection,
    title: t('ProfileView.default_redirection.title'),
    label: t(`ProfileView.default_redirection.label`)
  }
  const selectedSlug = getSelectedOption(
    fields.default_redirection.value,
    options,
    t
  )
  const fieldName = 'default_redirection'
  return (
    <div>
      <Select
        name={fieldName}
        options={options.map(app => {
          return {
            value: app.slug,
            label: app.name
          }
        })}
        fieldProps={fieldProps}
        value={selectedSlug}
        onChange={sel =>
          onChange(fieldName, formatDefaultRedirection(sel.value))
        }
      />
    </div>
  )
}

export default DefaultRedirectionSection
