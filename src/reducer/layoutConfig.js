// import { CHANGE_DATE_RANGE, CHANGE_SELECTION, DELETE_ARTICLE } from '../constants'

const defaultLayout = {
	className: "layout",
	isResizable: false,
	items: 3,
	cols: 6,
	rowHeight: 80,
	onLayoutChange: function() {},
	// This turns off compaction so you can place items wherever.
	verticalCompact: false
}

export default (layout = defaultLayout, action) => {
    const { type, payload } = action

    switch (type) {
        case 'CHANGE_DATE_RANGE':
//            return Object.assign({}, filters, { dateRange: payload.dateRange })
            return {...layout, dateRange: payload.dateRange}
    }

    return layout
}