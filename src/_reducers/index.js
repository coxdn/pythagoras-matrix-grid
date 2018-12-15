import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { peoples } from './peoples.reducer'
import { _alert } from './alert.reducer'
import { layoutConfig } from './layoutConfig.reducer'
import { layoutContent } from './layoutContent.reducer'
import { editor } from './editor.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  peoples,
  _alert,
  layoutConfig,
  layoutContent,
  editor
})

export default rootReducer