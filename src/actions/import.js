import { cozyFetch } from 'actions'

import { STACK_DOMAIN } from 'actions'

export const PRECHECK_IMPORT = 'PRECHECK_IMPORT'
export const PRECHECK_IMPORT_FAILURE = 'PRECHECK_IMPORT_FAILURE'
export const PRECHECK_IMPORT_SUCCESS = 'PRECHECK_IMPORT_SUCCESS'

export const IMPORT_IMPORT = 'IMPORT_IMPORT'
export const IMPORT_IMPORT_FAILURE = 'IMPORT_IMPORT_FAILURE'
export const IMPORT_IMPORT_SUCCESS = 'IMPORT_IMPORT_SUCCESS'

export const precheckImport = url => {
  return async dispatch => {
    dispatch({ type: PRECHECK_IMPORT })
    try {
      await cozyFetch('POST', '/move/imports/precheck', {
        data: { attributes: { url: url } }
      })
      dispatch({ type: PRECHECK_IMPORT_SUCCESS })
    } catch (e) {
      let error = 'server_error'
      switch (e.errors && e.errors[0] && +e.errors[0].status) {
        case 412:
          error = 'invalid_url'
          break
        case 422:
          error = 'quota_too_small'
          break
      }
      dispatch({
        type: PRECHECK_IMPORT_FAILURE,
        error: 'ProfileView.import.' + error
      })
      throw e
    }
  }
}

export const submitImport = url => {
  return async dispatch => {
    dispatch({ type: PRECHECK_IMPORT })
    try {
      await cozyFetch('POST', '/move/imports', {
        data: { attributes: { url: url } }
      })
      dispatch({ type: PRECHECK_IMPORT_SUCCESS })
      return STACK_DOMAIN + '/move/importing'
    } catch (e) {
      dispatch({
        type: PRECHECK_IMPORT_FAILURE,
        error: 'ProfileView.import.server_error'
      })
      throw e
    }
  }
}
