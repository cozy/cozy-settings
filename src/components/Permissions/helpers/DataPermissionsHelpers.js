export const retrieveSlugsOfPermission = (apps, konnectors, permissionName) => {
  const hiddenSlugs = ['home', 'store', 'settings']
  let queryResultSlugs = []
  let slugs = []

  if (apps?.data?.length > 0 || konnectors?.data?.length > 0) {
    queryResultSlugs = [
      ...apps.data.filter(({ slug }) => !hiddenSlugs.includes(slug)),
      ...konnectors.data
    ]

    for (const queryResultSlug of queryResultSlugs) {
      Object.values(queryResultSlug.permissions).map(({ type }) => {
        if (type == permissionName) {
          slugs.push(queryResultSlug)
        }
      })
    }
  }

  return slugs
}
