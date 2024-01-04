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

  if (!Number.isInteger(value)) {
    return flagLabel
  }

  const beginning = `${flagLabel}${lang === 'fr' ? ' ' : ''}`

  if (value === -1) {
    return `${beginning}${t(`Subscription.included.numeric_flag_unlimited`)}`
  }

  if (name === 'coachco2.max-days-to-capture') {
    return `${beginning}${t(`Subscription.included.max_days`, {
      smart_count: value
    })}`
  }

  return `${beginning}${t(`Subscription.included.numeric_flag`, {
    smart_count: value
  })}`
}

function computeGeneralOfferCredits() {
  const offers = flag('harvest.accounts.offers.list') || []
  const generalOffers = offers.filter(offer => offer.slug === '*')

  return generalOffers.reduce((total, offer) => {
    const now = new Date()
    const startsAt = new Date(offer.startsAt)
    const endsAt = offer.endsAt ? new Date(offer.endsAt) : new Date()
    if (now >= startsAt && now <= endsAt) {
      return total + offer.credit
    }

    return total
  }, 0)
}

/**
 * Compute the label for the flag harvest.accounts.max
 * @param {Function} t function to transle content
 * @param {string} lang current language
 * @returns {string} the label for the flag
 */
export function computeAccountsLabel(t, lang) {
  const flagLabel = t(`Subscription.included.flags.harvest.accounts.max`)
  const maxAccounts = flag('harvest.accounts.max')

  if (!Number.isInteger(maxAccounts)) {
    return flagLabel
  }

  const beginning = `${flagLabel}${lang === 'fr' ? ' ' : ''}`

  if (maxAccounts === -1) {
    return `${beginning}${t(`Subscription.included.accounts_unlimited`)}`
  }

  const credits = computeGeneralOfferCredits()
  const creditsLabel =
    credits > 0
      ? ` ${t('Subscription.included.accounts_offer', {
          max: maxAccounts,
          smart_count: credits
        })}`
      : ''

  return `${beginning}${t(`Subscription.included.accounts`, {
    smart_count: maxAccounts + credits
  })}${creditsLabel}`
}
