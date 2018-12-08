import { userConstants } from '../_constants'
import { getNearestFreeXY } from '../_helpers'

const initialConfig = {
	className: "layout",
	isResizable: false,
	items: 0,
	cols: 4,
	rowHeight: 100,
	layout: [],
	onLayoutChange: function() {},
	// This turns off compaction so you can place items wherever.
	verticalCompact: false
}

export const layoutConfig = (layoutConfig = initialConfig, action) => {
    const { type, payload, randomId } = action

    switch (type) {
        case 'INCREMENT':
//            return Object.assign({}, filters, { dateRange: payload.dateRange })
            return {...layoutConfig, items: layoutConfig.items + 1}
        case userConstants.ADD_ITEM:
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
        case userConstants.UPDATE_LAYOUT:
        	console.log('--- UPDATE_LAYOUT', payload)
        	return {...layoutConfig, items: payload.length, layout: payload}
    }

    return layoutConfig
}