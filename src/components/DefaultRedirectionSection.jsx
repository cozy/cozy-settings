import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import {
  useQuery,
  hasQueryBeenLoaded,
  deconstructRedirectLink
} from 'cozy-client'
import { getAppDisplayName } from 'cozy-client/dist/models/applications'

import Select from 'components/Select'
import { buildAppsQuery } from 'lib/queries'
import { useWebviewIntent } from 'cozy-intent'
import { isFlagshipApp } from 'cozy-device-helper'

const EXCLUDED_SLUGS = ['settings', 'store', 'home']

const formatOptions = (appsResult, t) => {
  if (!hasQueryBeenLoaded(appsResult)) return []

  const renamedHome = {
    slug: 'home',
    name: t('ProfileView.default_redirection.app_list')
  }

  const filteredApps = appsResult.data
    .filter(app => !EXCLUDED_SLUGS.includes(app.slug))
    .map(app => ({
      slug: app.slug,
      name: getAppDisplayName(app)
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

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
  const webviewIntent = useWebviewIntent()
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
        onChange={sel => {
          const newDefaultRedirection = formatDefaultRedirection(sel.value)
          onChange(fieldName, newDefaultRedirection)
          if (isFlagshipApp()) {
            webviewIntent.call('setDefaultRedirection', newDefaultRedirection)
          }
        }}
      />
    </div>
  )
}

export default DefaultRedirectionSection
