import { getNearestFreeXY } from '../_helpers'

export default store => next => action => {
    if (!action.getNearestCoords) return next(action)
    const state = store.getState().gridConfig
    const {x, y} = getNearestFreeXY(state.layout, state.cols)
    next({
        ...action,
        nearestCoords: { x, y }
    })
}
