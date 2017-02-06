import { combineReducers } from 'redux'

import fields from './fields'
import instance from './instance'
import ui from './ui'

const settingsApp = combineReducers({
  instance,
  fields,
  ui
})

export default settingsApp
