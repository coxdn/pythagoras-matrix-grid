export default store => next => action => {
    if (!action.getIds) return next(action)
    const gc = store.getState().gridContent
    next({
        ...action,
        ids: Object.keys(gc).filter(item => gc[item].value && gc[item].value == action.payload.value)
    })
}
