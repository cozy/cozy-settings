import { combineReducers } from 'redux'

import fields from 'reducers/fields'
import twoFactor from 'reducers/twoFactor'
import exportData from 'reducers/export'
import passphrase from 'reducers/passphrase'
import instance from 'reducers/instance'
import claudy from 'reducers/claudy'
import service from 'reducers/service'
import emailStatus from 'reducers/emailStatus'
import devices from 'reducers/devices'
import deviceToRevoke from 'reducers/deviceToRevoke'
import openDeviceRevokeModale from 'reducers/openDeviceRevokeModale'
import sessions from 'reducers/sessions'
import storageData from 'reducers/storageData'
import ui from 'reducers/ui'

const settingsApp = combineReducers({
  devices,
  fields,
  twoFactor,
  exportData,
  instance,
  claudy,
  service,
  emailStatus,
  openDeviceRevokeModale,
  deviceToRevoke,
  passphrase,
  sessions,
  storageData,
  ui
})

export default settingsApp
