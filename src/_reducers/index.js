import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { layoutConfig } from './layoutConfig'
import { layoutContent } from './layoutContent'

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  layoutConfig,
  layoutContent
});

export default rootReducer;