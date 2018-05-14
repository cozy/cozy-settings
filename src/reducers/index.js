import { combineReducers } from 'redux'

import fields from './fields'
import twoFactor from './twoFactor'
import exportStatus from './export'
import passphrase from './passphrase'
import instance from './instance'
import claudy from './claudy'
import service from './service'
import emailStatus from './emailStatus'
import devices from './devices'
import deviceToRevoke from './deviceToRevoke'
import openDeviceRevokeModale from './openDeviceRevokeModale'
import sessions from './sessions'
import storageData from './storageData'
import ui from './ui'

const settingsApp = combineReducers({
  devices,
  fields,
  twoFactor,
  exportStatus,
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
