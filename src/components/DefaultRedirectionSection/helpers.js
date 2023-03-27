import { deconstructRedirectLink } from 'cozy-client'
import { getAppDisplayName } from 'cozy-client/dist/models/applications'

const EXCLUDED_SLUGS = ['settings', 'store', 'home']

export const formatOptions = (apps, t) => {
  const renamedHome = {
    slug: 'home',
    name: t('ProfileView.default_redirection.app_list')
  }

  const filteredApps = apps
    .filter(app => !EXCLUDED_SLUGS.includes(app.slug))
    .map(app => ({
      slug: app.slug,
      name: getAppDisplayName(app)
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return [renamedHome, ...filteredApps]
}

export const getSelectedOption = (defautRedirection, options, t) => {
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

export const formatDefaultRedirection = slug => `${slug}/`

export const shouldDisableDefaultRedirectionSnackbar = (
  defaultRedirection,
  homeSettings
) => {
  const { default_redirection_snackbar_disabled } = homeSettings

  try {
    const { slug } = deconstructRedirectLink(defaultRedirection)

    return slug === 'home' && !default_redirection_snackbar_disabled
  } catch {
    return false
  }
}

export const disableDefaultRedirectionSnackbar = async (
  client,
  homeSettings
) => {
  const newHomeSettings = {
    _type: 'io.cozy.home.settings',
    ...homeSettings,
    default_redirection_snackbar_disabled: true
  }

  return await client.save(newHomeSettings)
}
