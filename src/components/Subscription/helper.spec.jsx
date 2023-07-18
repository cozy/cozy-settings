import flag from 'cozy-flags'
import { isFlagDisabled } from 'components/Subscription/helper'

jest.mock('cozy-flags')

describe('Subscription helper', () => {
  describe('isFlagDisabled', () => {
    it('should be disable when the flag return null', () => {
      flag.mockReturnValue(null)

      const res = isFlagDisabled('drive.office.enabled')
      expect(res).toBe(true)
    })

    it('should be disable when the flag return false', () => {
      flag.mockReturnValue(false)

      const res = isFlagDisabled('drive.office.enabled')
      expect(res).toBe(true)
    })

    it('shoul not be disable when flag return true', () => {
      flag.mockReturnValue(true)

      const res = isFlagDisabled('drive.office.enabled')
      expect(res).toBe(false)
    })
  })
})
