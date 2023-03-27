import { hasQueryBeenLoaded, deconstructRedirectLink } from 'cozy-client'
import { getAppDisplayName } from 'cozy-client/dist/models/applications'

const EXCLUDED_SLUGS = ['settings', 'store', 'home']

export const formatOptions = (appsResult, t) => {
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
