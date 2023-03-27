import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useClient, useQuery } from 'cozy-client'

import Select from 'components/Select'
import { buildAppsQuery, buildHomeSettingsQuery } from 'lib/queries'
import { useWebviewIntent } from 'cozy-intent'
import { isFlagshipApp } from 'cozy-device-helper'

import {
  formatOptions,
  getSelectedOption,
  formatDefaultRedirection,
  shouldDisableDefaultRedirectionSnackbar,
  disableDefaultRedirectionSnackbar
} from './helpers'

const DefaultRedirectionSection = props => {
  const { t } = useI18n()
  const webviewIntent = useWebviewIntent()
  const client = useClient()

  const appsQuery = buildAppsQuery()
  const appsResult = useQuery(appsQuery.definition, appsQuery.options)

  const homeSettingsQuery = buildHomeSettingsQuery()
  const homeSettingsResult = useQuery(
    homeSettingsQuery.definition,
    homeSettingsQuery.options
  )

  const apps = appsResult.data || []
  const homeSettings =
    (homeSettingsResult.data && homeSettingsResult.data[0]) || {}

  const options = formatOptions(apps, t)

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

          if (
            shouldDisableDefaultRedirectionSnackbar(
              fields.default_redirection.value,
              homeSettings
            )
          ) {
            disableDefaultRedirectionSnackbar(client, homeSettings)
          }

          if (isFlagshipApp()) {
            webviewIntent.call('setDefaultRedirection', newDefaultRedirection)
          }
        }}
      />
    </div>
  )
}

export default DefaultRedirectionSection
