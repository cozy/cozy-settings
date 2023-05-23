import fields from './fields'

import { FETCH_INFOS_SUCCESS } from '../actions'

import { AUTH_MODE } from '../actions/twoFactor'

describe('fields reducer', () => {
  let state
  beforeEach(() => {
    const initialState = {}
    const initialAction = {}
    state = fields(initialState, initialAction)
  })

  it('should have a default state', () => {
    expect(state).toEqual({
      email: {
        value: '',
        submitting: false,
        saved: false,
        errors: []
      },
      locale: {
        value: '',
        submitting: false,
        saved: false,
        errors: []
      },
      public_name: {
        value: '',
        submitting: false,
        saved: false,
        errors: []
      },
      default_redirection: {
        value: '',
        submitting: false,
        saved: false,
        errors: []
      },
      tracking: {
        value: '',
        submitting: false,
        saved: false,
        errors: []
      },
      auth_mode: {
        value: '',
        submitting: false,
        saved: false,
        errors: []
      }
    })
  })

  it('should react to normal actions', () => {
    state = fields(state, {
      type: FETCH_INFOS_SUCCESS,
      instance: {
        data: {
          attributes: {
            auth_mode: AUTH_MODE.TWO_FA_MAIL
          }
        }
      }
    })
    expect(state.auth_mode.value).toBe('two_factor_mail')
  })
})
