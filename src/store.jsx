import {
  compose,
  createStore as reduxCreateStore,
  applyMiddleware
} from 'redux'
import thunkMiddleware from 'redux-thunk'

import flag from 'cozy-flags'

import appReducer from '@/reducers'

const createStore = client => {
  // Enable Redux dev tools
  const composeEnhancers =
    (flag('debug') && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const middlewares = [thunkMiddleware]

  const store = reduxCreateStore(
    appReducer(client),
    composeEnhancers(applyMiddleware(...middlewares))
  )

  return store
}

export default createStore
