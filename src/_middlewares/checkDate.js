import { pythagoras } from '../_helpers'
import { gridConstants, peoplesConstants } from '../_constants'
import { alertActions } from '../_actions'

export default store => next => action => {
    if (!action.checkDate) return next(action)
    const { payload, payload: { date } } = action
    const checkDate = pythagoras.checkDate(date)

    next({
    	...action,
    	payload: {
            ...payload,
            error: checkDate.error,
            date: checkDate.error ? date : checkDate.fullDate
        }
    })

    if (checkDate.error)
    switch(action.type) {
        case gridConstants.UPDATE_ITEM:
            store.dispatch(alertActions.grid.error(checkDate.error))
            break
            
        case peoplesConstants.ADD_ITEM_TO_GRID:
            store.dispatch(alertActions.peoples.error(checkDate.error))
            break
    }
}
