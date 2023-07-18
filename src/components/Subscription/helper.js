import flag from 'cozy-flags'

/**
 * Determines whether the flag is disabled or not
 * @param {string} name name of the flag
 * @returns {boolean} whether the flag is disabled or not
 */
export function isFlagDisabled(name) {
  const value = flag(name)
  if (value !== null) {
    return Number.isInteger(value) ? false : !value
  }
  return true
}

/**
 * Compute the label for a flag
 * @param {string} name name of the flag
 * @param {Function} t function to transle content
 * @param {string} lang current language
 * @returns {string} the label for a flag
 */
export function computeFlagLabel(name, t, lang) {
  const flagLabel = t(`Subscription.included.flags.${name}`)
  const value = flag(name)
  if (Number.isInteger(value)) {
    return (
      flagLabel +
      (lang === 'fr' ? ' ' : '') +
      (value === -1
        ? t(`Subscription.included.numeric_flag_unlimited`)
        : t(`Subscription.included.numeric_flag`, { smart_count: value }))
    )
  }
  return flagLabel
}
