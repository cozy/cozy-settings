import PERMISSIONS_ICONS from '../../../config/permissionsIcons.json'

export const displayPermissions = verbs => {
  return !verbs || (verbs.length > 1 && verbs.includes('GET'))
    ? 'Permissions.readAndWrite'
    : verbs.length === 1 && verbs.includes('GET')
    ? 'Permissions.read'
    : 'Permissions.write'
}

export const getPermissionIconName = type => {
  return PERMISSIONS_ICONS[type] || 'Fallback'
}

export const completePermission = (apps, konnectors) => {
  const hiddenSlugs = ['home', 'store', 'settings']
  let slugs = []
  const permissionsToDisplay = {}
  if (apps?.data?.length > 0 || konnectors?.data?.length > 0) {
    slugs = [
      ...apps.data.filter(({ slug }) => !hiddenSlugs.includes(slug)),
      ...konnectors.data
    ]

    for (const { slug, permissions } of slugs) {
      Object.values(permissions).map(({ type }) => {
        if (!permissionsToDisplay[type]) {
          permissionsToDisplay[type] = []
        }
        permissionsToDisplay[type].push(slug)
      })
    }
  }
  return permissionsToDisplay
}
