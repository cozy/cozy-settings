import { combineReducers } from 'redux'

import fields from './fields'
import passphrase from './passphrase'
import instance from './instance'
import devices from './devices'
import deviceToRevoke from './deviceToRevoke'
import openDeviceRevokeModale from './openDeviceRevokeModale'
import ui from './ui'

const settingsApp = combineReducers({
  devices,
  fields,
  instance,
  openDeviceRevokeModale,
  deviceToRevoke,
  passphrase,
  ui
})

export default settingsApp
