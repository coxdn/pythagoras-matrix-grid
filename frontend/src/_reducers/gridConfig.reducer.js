import { gridConstants, peoplesConstants, editConstants } from '../_constants'
import { getNearestFreeXY } from '../_helpers'

const initialState = {
    className: "layout",
    isResizable: false,
    items: 0,
    cols: 4,
    rowHeight: 142,
    layout: [],
    onLayoutChange: function() {},
    // This turns off compaction so you can place items wherever.
    compactType: null
}

export const gridConfig = (state = initialState, action) => {
    const { type, payload } = action
    var layout

    switch (type) {
        case peoplesConstants.ADD_ITEM_TO_GRID:
            if (payload.error) return state
            // continuing case
            // ˅˅˅˅˅˅˅˅˅˅˅˅˅
        case gridConstants.ADD_ITEM:
            const {x, y} = getNearestFreeXY(state.layout, state.cols)
            return {...state,
                items: state.items + 1,
                layout: state.layout.concat({
                    x,
                    y,
                    h: 1,
                    w: 1,
                    i: payload.randomId
                })
            }

        case gridConstants.REMOVE_ITEM:
            const { id } = payload
            var { layout } = state
            return {
                ...state,
                items: layout.length - 1,
                layout: layout.filter(item => item.i!=id)
            }

        case gridConstants.UPDATE_ALL:
            var { layout } = payload
            return {
                ...state,
                items: layout.length,
                layout
            }

        case editConstants.REMOVE_SUCCESS:
            layout = state.layout.filter(item => payload.ids.indexOf(item.i) === -1)
            return {
                ...state,
                items: layout.length,
                layout
            }
    }

    return state
}