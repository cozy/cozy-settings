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

export const sortPermissionsByName = (permissionsToDisplay, t) => {
  return Object.entries(permissionsToDisplay).sort((a, b) => {
    return t('CozyPermissions.Permissions.' + a[0])
      .toString()
      .localeCompare(t('CozyPermissions.Permissions.' + b[0]))
  })
}
