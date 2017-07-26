/* global cozy */

import CLAUDY_ACTIONS from '../config/claudyActions'

import { cozyFetch, fetchDevices } from './index'

export const FETCH_CLAUDY_INFOS = 'FETCH_CLAUDY_INFOS'
export const FETCH_CLAUDY_INFOS_SUCCESS = 'FETCH_CLAUDY_INFOS_SUCCESS'
export const FETCH_CLAUDY_INFOS_FAILURE = 'FETCH_CLAUDY_INFOS_FAILURE'

export const CREATE_INTENT_SERVICE = 'CREATE_INTENT_SERVICE'
export const CREATE_INTENT_SERVICE_SUCCESS = 'CREATE_INTENT_SERVICE_SUCCESS'
export const CREATE_INTENT_SERVICE_FAILURE = 'CREATE_INTENT_SERVICE_FAILURE'

export const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'

export const createIntentService = (intent, window) => {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_INTENT_SERVICE })
    cozy.client.intents.createService(intent, window)
    .then(service => {
      dispatch({ type: CREATE_INTENT_SERVICE_SUCCESS, service })
    })
    .catch(error => {
      dispatch({ type: CREATE_INTENT_SERVICE_FAILURE, error })
    })
  }
}

export const fetchClaudyInfos = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_CLAUDY_INFOS })
    cozyFetch('GET', '/settings/context')
    .then(context => {
      const contextActions = (context.data && context.data.attributes && context.data.attributes['claudy_actions']) || null
      let claudyActions = []
      if (contextActions) {
        // get an arrays of action
        claudyActions = contextActions.map(slug => {
          if (CLAUDY_ACTIONS.hasOwnProperty(slug)) {
            // adding also the action slug
            return Object.assign({}, CLAUDY_ACTIONS[slug], { slug })
          }
        }).filter(action => action)
      }
      dispatch(consolidateClaudyActionsInfos(claudyActions))
    })
    .catch(error => {
      dispatch({ type: FETCH_CLAUDY_INFOS_FAILURE, error })
    })
  }
}

export const consolidateClaudyActionsInfos = (claudyActions) => {
  const ACTIONS_WITH_DEVICES = ['desktop', 'mobile']
  const ACTIONS_WITH_ACCOUNTS = ['cozy-collect']
  return async (dispatch, getState) => {
    let apps
    let collectAccounts
    // if at least one action requires app links
    if (claudyActions.find(a => a.link && a.link.type === 'apps')) {
      try {
        const appsResponse = await cozyFetch('GET', '/apps/')
        apps = appsResponse.data
      } catch (e) {
        console.warn && console.warn('Cannot fetch client devices infos for Claudy.')
        apps = [] // keep list empty if apps cannot be fetched
      }
    }
    // if at least one action requires devices infos
    if (claudyActions.find(a => ACTIONS_WITH_DEVICES.includes(a.slug))) {
      await dispatch(fetchDevices())
    }
    // if at least one action requires devices infos
    if (claudyActions.find(a => ACTIONS_WITH_ACCOUNTS.includes(a.slug))) {
      try {
        collectAccounts = await getAllAccounts()
      } catch (e) {
        console.warn && console.warn('Cannot fetch accounts infos for Claudy.')
        collectAccounts = [] // keep list empty if apps cannot be fetched
      }
    }
    dispatch({ type: FETCH_CLAUDY_INFOS_SUCCESS, claudyActions, apps, collectAccounts })
  }
}

let cachedAccountsIndex
function indexAccountsByType () {
  return cachedAccountsIndex
    ? Promise.resolve(cachedAccountsIndex)
    : cozy.client.data.defineIndex(ACCOUNTS_DOCTYPE, ['account_type', 'name'])
      .then(index => {
        cachedAccountsIndex = index
        return Promise.resolve(index)
      })
}

export function getAllAccounts () {
  return indexAccountsByType()
  .then(index => {
    return cozy.client.data.query(index, {
      selector: {'account_type': {'$gt': null}}
    })
  })
}
