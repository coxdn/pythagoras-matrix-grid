import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { peoples } from './peoples.reducer'
import { _alert } from './alert.reducer'
import { gridConfig } from './gridConfig.reducer'
import { gridContent } from './gridContent.reducer'
import { editor } from './editor.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  peoples,
  _alert,
  gridConfig,
  gridContent,
  editor
})

export default rootReducer