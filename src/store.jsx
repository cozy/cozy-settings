/* global __DEVELOPMENT__ */

import appReducer from 'reducers'
import thunkMiddleware from 'redux-thunk'
import {
  compose,
  createStore as reduxCreateStore,
  applyMiddleware
} from 'redux'

const createStore = () => {
  // Enable Redux dev tools
  const composeEnhancers =
    (__DEVELOPMENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const middlewares = [thunkMiddleware]

  const store = reduxCreateStore(
    appReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  return store
}

export default createStore
