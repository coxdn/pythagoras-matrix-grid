import { layoutAlertActions } from '../_actions'
import { pythagoras } from '../_helpers'

export default store => next => action => {
    if (!action.checkNew) return next(action)
    const { payload, payload: {date} } = action
    const checkDate = pythagoras.checkDate(date)
	if (checkDate.error) {
		store.dispatch(layoutAlertActions.error(checkDate.error))
        // action.payload.error = true
	}
    next({
    	...action,
    	payload: {...payload, error: checkDate.error, date: checkDate.error ? date : checkDate.fullDate}
    })
}
