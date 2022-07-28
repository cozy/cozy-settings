export const displayPermissions = verbs => {
  return !verbs || (verbs.length > 1 && verbs.includes('GET'))
    ? 'Lecture et Écriture'
    : verbs.length === 1 && verbs.includes('GET')
    ? 'Lecture'
    : 'Écriture'
}
