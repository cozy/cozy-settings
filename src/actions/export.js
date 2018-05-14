import { cozyFetch } from './index'

export const REQUEST_EXPORT = 'REQUEST_EXPORT'
export const REQUEST_EXPORT_FAILURE = 'REQUEST_EXPORT_FAILURE'
export const REQUEST_EXPORT_SUCCESS = 'REQUEST_EXPORT_SUCCESS'

export const requestExport = () => {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_EXPORT })
    //  we have to send a body due to the JsonAPI
    cozyFetch('POST', '/move/exports', { data: { attributes: {} } })
    .then(() => {
      dispatch({ type: REQUEST_EXPORT_SUCCESS })
    }).catch(() => {
      dispatch({ type: REQUEST_EXPORT_FAILURE, error: 'ProfileView.export.server_error' })
    })
  }
}
