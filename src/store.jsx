import appReducer from '@/reducers'
import thunkMiddleware from 'redux-thunk'
import {
  compose,
  createStore as reduxCreateStore,
  applyMiddleware
} from 'redux'
import flag from 'cozy-flags'

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
