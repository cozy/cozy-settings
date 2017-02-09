/* global fetch */

import emailHelper from '../lib/emailHelper'

export const FETCH_INFOS = 'FETCH_INFOS'
export const FETCH_INFOS_SUCCESS = 'FETCH_INFOS_SUCCESS'
export const FETCH_INFOS_FAILURE = 'FETCH_INFOS_FAILURE'
export const UPDATE_INFO = 'UPDATE_INFO'
export const UPDATE_INFO_SUCCESS = 'UPDATE_INFO_SUCCESS'
export const UPDATE_INFO_FAILURE = 'UPDATE_INFO_FAILURE'
export const RESET_INFO_FIELD = 'RESET_INFO_FIELD'
export const SET_LANG = 'SET_LANG'
export const UPDATE_PASSPHRASE = 'UPDATE_PASSPHRASE'
export const UPDATE_PASSPHRASE_SUCCESS = 'UPDATE_PASSPHRASE_SUCCESS'
export const UPDATE_PASSPHRASE_FAILURE = 'UPDATE_PASSPHRASE_FAILURE'

export const fetchInfos = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_INFOS })
    cozyFetch('GET', '/settings/instance')
      .then(instance => {
        dispatch({ type: FETCH_INFOS_SUCCESS, instance })
      })
      .catch(() => {
        dispatch({ type: FETCH_INFOS_FAILURE, error: 'AccountView.infos.server_error' })
      })
  }
}

export const updateInfo = (field, value) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_INFO, field, value })
    // Check if the field is empty or not
    if (value === '') {
      dispatch({ type: UPDATE_INFO_FAILURE, field, error: 'AccountView.infos.empty' })
      return
    }
    if ((field === 'email') && (!emailHelper.isValidEmail(value))) {
      dispatch({ type: UPDATE_INFO_FAILURE, field, error: 'AccountView.email.error' })
      return
    }
    let newInstance = Object.assign({}, getState().instance)
    newInstance.data.attributes[field] = value
    cozyFetch('PUT', '/settings/instance', newInstance)
      .then(instance => {
        dispatch({ type: UPDATE_INFO_SUCCESS, field, instance })
        setTimeout(() => {
          dispatch({ type: RESET_INFO_FIELD, field })
        }, 3000)
        if (field === 'locale') {
          dispatch({ type: SET_LANG, lang: value })
        }
      })
      .catch(() => {
        dispatch({ type: UPDATE_INFO_FAILURE, error: 'AccountView.infos.server_error' })
      })
  }
}

export const updatePassphrase = (current, newVal) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_PASSPHRASE })
    return cozyFetch('PUT', '/settings/passphrase', {
      'current_passphrase': current,
      'new_passphrase': newVal
    }).then(instance => {
      dispatch({ type: UPDATE_PASSPHRASE_SUCCESS })
    }).catch(error => {
      const errors = error.errors || []
      if (errors.length && errors[0].detail === 'Invalid passphrase') {
        dispatch({
          type: UPDATE_PASSPHRASE_FAILURE,
          errors: { currentPassword: 'AccountView.password.wrong_password' }
        })
      } else {
        dispatch({
          type: UPDATE_PASSPHRASE_FAILURE,
          errors: { global: 'AccountView.password.server_error' }
        })
      }
    })
  }
}

const STACK_DOMAIN = 'http://cozy.local:8080'

const cozyFetch = (method, path, body) => {
  let params = {
    method: method,
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (body) {
    params.body = JSON.stringify(body)
  }
  return fetch(`${STACK_DOMAIN}${path}`, params)
    .then(response => {
      return (response.status === 200 || response.status === 204)
        ? response.json()
        : response.json().then(Promise.reject.bind(Promise))
    })
}
