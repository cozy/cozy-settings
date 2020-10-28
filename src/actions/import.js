import { cozyFetch } from 'actions'

export const PRECHECK_IMPORT = 'PRECHECK_IMPORT'
export const PRECHECK_IMPORT_FAILURE = 'PRECHECK_IMPORT_FAILURE'
export const PRECHECK_IMPORT_SUCCESS = 'PRECHECK_IMPORT_SUCCESS'

export const precheckImport = url => {
  return dispatch => {
    dispatch({ type: PRECHECK_IMPORT })
    return cozyFetch('POST', '/move/imports/precheck', {
      data: { attributes: { url: url } }
    })
      .then(() => {
        dispatch({ type: PRECHECK_IMPORT_SUCCESS })
      })
      .catch(e => {
        let error = 'server_error'
        switch (e.errors[0] && +e.errors[0].status) {
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
      })
  }
}
