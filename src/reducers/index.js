import { combineReducers } from 'redux'

import fields from './fields'
import passphrase from './passphrase'
import instance from './instance'
import ui from './ui'

const settingsApp = combineReducers({
  instance,
  fields,
  passphrase,
  ui
})

export default settingsApp
