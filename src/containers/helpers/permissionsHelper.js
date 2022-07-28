export const displayPermissions = verbs => {
  return !verbs || (verbs.length > 1 && verbs.includes('GET'))
    ? 'Permissions.readAndWrite'
    : verbs.length === 1 && verbs.includes('GET')
    ? 'Permissions.read'
    : 'Permissions.write'
}
