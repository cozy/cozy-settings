import { validatePhoneNumber } from './phoneHelper'

describe('phoneHelper', () => {
  describe('validatePhoneNumber', () => {
    it('should return false for null or undefined values', () => {
      expect(validatePhoneNumber(null)).toBe(false)
      expect(validatePhoneNumber(undefined)).toBe(false)
    })

    it('should return false for non-string values', () => {
      expect(validatePhoneNumber(123456789)).toBe(false)
      expect(validatePhoneNumber({})).toBe(false)
      expect(validatePhoneNumber([])).toBe(false)
    })

    it('should return false for empty string', () => {
      expect(validatePhoneNumber('')).toBe(false)
    })

    describe('Valid phone number formats', () => {
      const validPhoneNumbers = [
        // Basic formats
        '0912345678',
        '123-456-7890',
        '123.456.7890',
        '123 456 7890',
        '(123) 456-7890',

        // International formats
        '+1-555-123-4567', // US
        '+44 20 1234 5678', // UK
        '+33123456789', // France
        '+49 30 1234 5678', // Germany
        '+81 3 1234 5678', // Japan
        '+86 10 1234 5678', // China
        '+61 2 1234 5678', // Australia

        // Mixed formats
        '+1 (123) 456-7890',
        '(123)456-7890'
      ]

      validPhoneNumbers.forEach(phoneNumber => {
        it(`should return true for valid phone number: ${phoneNumber}`, () => {
          expect(validatePhoneNumber(phoneNumber)).toBe(true)
        })
      })
    })

    describe('Invalid phone number formats', () => {
      const invalidPhoneNumbers = [
        // Too short
        '123',
        '+1',

        // Contains invalid characters
        'abc1234567',
        '123-abc-7890',
        '123@456@7890',

        // Incorrect format
        '++1234567890', // Double plus sign
        '(123))456-7890', // Unbalanced parentheses
        '(123', // Incomplete parentheses

        // Too long
        '123456789012345678901',
        '+123456789012345678901'
      ]

      invalidPhoneNumbers.forEach(phoneNumber => {
        it(`should return false for invalid phone number: ${phoneNumber}`, () => {
          expect(validatePhoneNumber(phoneNumber)).toBe(false)
        })
      })
    })
  })
})
