import { combineReducers } from 'redux'

import fields from './fields'
import passphrase from './passphrase'
import instance from './instance'
import devices from './devices'
import ui from './ui'
import alerterReducer from 'cozy-ui/react/Alerter'

const settingsApp = combineReducers({
  instance,
  fields,
  passphrase,
  devices,
  ui,
  alerts: alerterReducer
})

export default settingsApp
