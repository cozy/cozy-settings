/* global __DEVELOPMENT__ */

import appReducer from 'reducers'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import {
  compose,
  createStore as reduxCreateStore,
  applyMiddleware
} from 'redux'

const createStore = () => {
  const loggerMiddleware = createLogger()

  // Enable Redux dev tools
  const composeEnhancers =
    (__DEVELOPMENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const middlewares = [thunkMiddleware]

  if (__DEVELOPMENT__) middlewares.push(loggerMiddleware)

  const store = reduxCreateStore(
    appReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  return store
}

export default createStore
