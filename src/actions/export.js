/* eslint-disable promise/always-return */
import { cozyFetch } from '@/actions'

export const REQUEST_EXPORT = 'REQUEST_EXPORT'
export const REQUEST_EXPORT_FAILURE = 'REQUEST_EXPORT_FAILURE'
export const REQUEST_EXPORT_SUCCESS = 'REQUEST_EXPORT_SUCCESS'

export const FETCH_EXPORT_DATA = 'FETCH_EXPORT_DATA'
export const FETCH_EXPORT_DATA_FAILURE = 'FETCH_EXPORT_DATA_FAILURE'
export const FETCH_EXPORT_DATA_SUCCESS = 'FETCH_EXPORT_DATA_SUCCESS'

export const requestExport = client => {
  return dispatch => {
    dispatch({ type: REQUEST_EXPORT })
    //  we have to send a body due to the JsonAPI
    return cozyFetch(client, 'POST', '/move/exports', {
      data: { attributes: {} }
    })
      .then(() => {
        dispatch({ type: REQUEST_EXPORT_SUCCESS })
      })
      .catch(() => {
        dispatch({
          type: REQUEST_EXPORT_FAILURE,
          error: 'ProfileView.export.server_error'
        })
      })
  }
}

export const fetchExportData = (client, exportId) => {
  return dispatch => {
    dispatch({ type: FETCH_EXPORT_DATA })
    return cozyFetch(client, 'GET', `/move/exports/${exportId}`)
      .then(resp => {
        dispatch({ type: FETCH_EXPORT_DATA_SUCCESS, data: resp.data })
      })
      .catch(error => {
        dispatch({
          type: FETCH_EXPORT_DATA_FAILURE,
          error: 'ProfileView.export.fetch_error'
        })
        throw error
      })
  }
}
