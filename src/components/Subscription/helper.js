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
    const accountPrefix = name.includes('accounts') ? 'account_' : ''
    const unlimited = t(
      `Subscription.included.numeric_${accountPrefix}flag_unlimited`
    )
    const numberic = t(`Subscription.included.numeric_${accountPrefix}flag`, {
      smart_count: value
    })

    return (
      flagLabel +
      (lang === 'fr' ? ' ' : '') +
      (value === -1 ? unlimited : numberic)
    )
  }
  return flagLabel
}
