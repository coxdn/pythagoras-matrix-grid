import { ADD_ITEM, UPDATE_LAYOUT } from '../constants'
import { getNearestFreeXY } from '../helpers'

const defaultLayout = {
	className: "layout",
	isResizable: false,
	items: [],
	cols: 6,
	rowHeight: 80,
	onLayoutChange: function() {},
	// This turns off compaction so you can place items wherever.
	verticalCompact: false
}

export default (layout = defaultLayout, action) => {
    const { type, payload } = action

    switch (type) {
        case 'INCREMENT':
//            return Object.assign({}, filters, { dateRange: payload.dateRange })
            return {...layout, items: layout.items + 1}
        case ADD_ITEM:
        	const {x, y} = getNearestFreeXY(layout.items, layout.cols)
        	console.log('in reducer:', x, y)
        	return {...layout, items: layout.items.concat({
        		x, y,
        		h: 1,
        		w: 1,
        		i: Math.random().toString(),
        		content: payload
        	})}
        case UPDATE_LAYOUT:
        	return {...layout, items: payload}
    }

    return layout
}