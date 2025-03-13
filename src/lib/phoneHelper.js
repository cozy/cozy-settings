/**
 * Regular expression for phone number validation
 * Supports formats:
 * - May start with a + sign (optional)
 * - May have parentheses for country/area code (optional)
 * - Number groups may be separated by hyphens, spaces, or dots
 * - Supports complex formats like "+1 (123) 456-7890"
 */
const PHONE_REGEX =
  /^[+]?[0-9]{0,3}[ ]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/

/**
 * Validates a phone number
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} - true if the phone number is valid, false otherwise
 */
export const validatePhoneNumber = phoneNumber => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false
  }
  return PHONE_REGEX.test(phoneNumber)
}

export default {
  validatePhoneNumber
}
