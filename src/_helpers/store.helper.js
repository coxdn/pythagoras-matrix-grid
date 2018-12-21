import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'
import rootReducer from '../_reducers'
import randomId from '../_middlewares/randomId'
import checkDate from '../_middlewares/checkDate'
import getIds from '../_middlewares/getIds'
import getNearestCoords from '../_middlewares/getNearestCoords'

// const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
    	randomId,
    	checkDate,
    	getIds,
    	getNearestCoords,
        thunkMiddleware,
        // loggerMiddleware
    )
);

window.store = store