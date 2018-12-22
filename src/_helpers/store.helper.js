import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../_reducers'
import checkDate from '../_middlewares/checkDate'
import getIds from '../_middlewares/getIds'
import getNearestCoords from '../_middlewares/getNearestCoords'

const loggerMiddleware = createLogger()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/* eslint no-undef: 0 */
export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            checkDate,
            getIds,
            getNearestCoords,
            thunkMiddleware,
            __DEV__ ? loggerMiddleware : ()=>y=>z=>y(z),
        )
    )
)

if (__DEV__)
window.store = store