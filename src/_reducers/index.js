import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { peoples } from './peoples.reducer';
import { alert } from './alert.reducer';
import { layoutConfig } from './layoutConfig.reducer'
import { layoutContent } from './layoutContent.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  peoples,
  alert,
  layoutConfig,
  layoutContent
});

export default rootReducer;