import { ADD_ITEM, UPDATE_LAYOUT } from '../constants'
import { getNearestFreeXY } from '../helpers'

const initialConfig = {
	className: "layout",
	isResizable: false,
	items: 0,
	cols: 6,
	rowHeight: 80,
	layout: [],
	onLayoutChange: function() {},
	// This turns off compaction so you can place items wherever.
	verticalCompact: false
}

export default (layoutConfig = initialConfig, action) => {
    const { type, payload, randomId } = action

    switch (type) {
        case 'INCREMENT':
//            return Object.assign({}, filters, { dateRange: payload.dateRange })
            return {...layoutConfig, items: layoutConfig.items + 1}
        case ADD_ITEM:
        	const {x, y} = getNearestFreeXY(layoutConfig.layout, layoutConfig.cols)
        	// console.log('in reducer:', x, y, layoutConfig)
        	return {...layoutConfig,
        		items: layoutConfig.items + 1,
        		layout: layoutConfig.layout.concat({
	        		x, y,
	        		h: 1,
	        		w: 1,
	        		i: randomId
        		})
        	}
        case UPDATE_LAYOUT:
        	console.log('--- UPDATE_LAYOUT', payload)
        	return {...layoutConfig, items: payload.length, layout: payload}
    }

    return layoutConfig
}