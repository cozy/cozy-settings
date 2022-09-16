export const sortPermissionsByName = (permissionsToDisplay, t) => {
  return Object.entries(permissionsToDisplay).sort((a, b) => {
    return t('CozyPermissions.Permissions.' + a[0])
      .toString()
      .localeCompare(t('CozyPermissions.Permissions.' + b[0]))
  })
}
