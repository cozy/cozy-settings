import { combineReducers } from 'redux'

import claudy from '@/reducers/claudy'
import deviceToRevoke from '@/reducers/deviceToRevoke'
import devices from '@/reducers/devices'
import emailStatus from '@/reducers/emailStatus'
import exportData from '@/reducers/export'
import importData from '@/reducers/import'
import instance from '@/reducers/instance'
import openDeviceRevokeModale from '@/reducers/openDeviceRevokeModale'
import passphrase from '@/reducers/passphrase'
import service from '@/reducers/service'
import sessions from '@/reducers/sessions'
import storageData from '@/reducers/storageData'
import twoFactor from '@/reducers/twoFactor'
import ui from '@/reducers/ui'

const appReducer = client =>
  combineReducers({
    devices,
    twoFactor,
    exportData,
    importData,
    instance,
    claudy,
    service,
    emailStatus,
    openDeviceRevokeModale,
    deviceToRevoke,
    passphrase,
    sessions,
    storageData,
    ui,
    cozy: client.reducer()
  })

export default appReducer
