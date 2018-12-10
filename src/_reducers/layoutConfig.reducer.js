import { userConstants, layoutConstants } from '../_constants'
import { getNearestFreeXY } from '../_helpers'

const initialConfig = {
	className: "layout",
	isResizable: false,
	items: 0,
	cols: 4,
	rowHeight: 142,
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
        case layoutConstants.ADD_ITEM:
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

        case layoutConstants.REMOVE_ITEM:
            const {id} = payload
            const {layout} = layoutConfig
            return {
                ...layoutConfig,
                items: layout.length - 1,
                layout: layout.filter(item => item.i!=id)
            }

        case layoutConstants.UPDATE_LAYOUT:
        	// console.log('--- UPDATE_LAYOUT', payload)
            const {layout: _layout} = payload
        	return {...layoutConfig, items: _layout.length, layout: _layout}
    }

    return layoutConfig
}