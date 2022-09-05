import { createMockClient } from 'cozy-client'
import { submitPassword, containerForTesting } from './helpers'

jest.mock('lib/client', () => {
  const CozyClient = jest.requireActual('cozy-client').default
  return new CozyClient({})
})

const client = createMockClient({})
const primaryAction = jest.fn()
const setError = jest.fn()
const setIsRequired = jest.fn()
const setIsBusy = jest.fn()
const t = jest.fn()

const setup = async ({ currentPassphrase } = {}) =>
  await submitPassword({
    client,
    t,
    currentPassphrase,
    primaryAction,
    setError,
    setIsRequired,
    setIsBusy
  })

describe('submitPassword', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set required if no password value', async () => {
    await setup({ currentPassphrase: '' })

    expect(setError.mock.calls.length).toBe(1)
    expect(setError).toHaveBeenCalledWith('')
    expect(setIsRequired).toHaveBeenCalledWith(true)
    expect(setIsBusy).not.toHaveBeenCalled()
    expect(primaryAction).not.toHaveBeenCalled()
  })

  it('should set error for a wrong password ', async () => {
    jest
      .spyOn(containerForTesting, 'fetchPasswordValidation')
      .mockResolvedValue({ error: 'wrong password' })
    await setup({ currentPassphrase: 'wrondPassword' })

    expect(setError.mock.calls.length).toBe(2)
    expect(setError.mock.calls[0][0]).toBe('')
    expect(setError.mock.calls[1][0]).toBe('wrong password')

    expect(setIsRequired).not.toHaveBeenCalled()

    expect(setIsBusy.mock.calls.length).toBe(2)
    expect(setIsBusy.mock.calls[0][0]).toBe(true)
    expect(setIsBusy.mock.calls[1][0]).toBe(false)

    expect(primaryAction).not.toHaveBeenCalled()
  })

  it('should trigger primaryAction for a good password', async () => {
    jest
      .spyOn(containerForTesting, 'fetchPasswordValidation')
      .mockResolvedValue({ error: false })
    await setup({ currentPassphrase: 'goodPassword' })

    expect(setError.mock.calls.length).toBe(1)
    expect(setError).toHaveBeenCalledWith('')
    expect(setIsRequired).not.toHaveBeenCalled()

    expect(setIsBusy.mock.calls.length).toBe(2)
    expect(setIsBusy.mock.calls[0][0]).toBe(true)
    expect(setIsBusy.mock.calls[1][0]).toBe(false)

    expect(primaryAction).toHaveBeenCalled()
  })
})
