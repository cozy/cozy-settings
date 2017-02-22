import { combineReducers } from 'redux'

import fields from './fields'
import passphrase from './passphrase'
import instance from './instance'
import devices from './devices'
import ui from './ui'

const settingsApp = combineReducers({
  instance,
  fields,
  passphrase,
  devices,
  ui
})

export default settingsApp
