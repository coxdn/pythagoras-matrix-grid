import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../_reducers'
import randomId from '../_middlewares/randomId'

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
    	randomId,
        thunkMiddleware,
        loggerMiddleware
    )
);

window.store = store