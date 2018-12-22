import { pythagoras } from '../_helpers'

export default store => next => action => {
    if (!action.getAges) return next(action)
    next({
        ...action,
        payload: {
        	...action.payload,
        	peoples: action.payload.peoples ? action.payload.peoples.map(item => {
        		const age = pythagoras.getAge(item.date)
        		if (age.digits<135) item.age = age.format
        		return item
        	}) : []
        }
    })
}