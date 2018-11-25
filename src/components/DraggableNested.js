import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd';
import { getItemStyle, getHideFlag } from '../helpers'

class DraggableNested extends PureComponent {
    componentDidUpdate() {
        console.log(' --- componentDidUpdate 2')
    }

	render() {
		const { item, state, index, droppableId, hideElement } = this.props
		
		// console.log('---- item', item)
		const divStyle = droppableId=="d2" && item.id=="item-2-1-hidden" && hideElement ? {
			display: 'block',
			height: '42px',
			'padding-top': '8px',
			'padding-bottom': '8px'
		} : {}

		return (
			<div>
            <Draggable
                key={item.id}
                draggableId={item.id}
                isDragDisabled={item.opacity ? true : false}
                index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            item.opacity,
                            droppableId=="d2"&&item.id=="item-2-1-hidden1" ? hideElement : getHideFlag({state, droppableId, id: item.id})
                        )}>
                        {item.content}
                    </div>
                )}
            </Draggable>
            <div style = {divStyle}></div>
            </div>
		)
	}
}

export default connect((state) => ({
	hideElement: state.hideElement
}))(DraggableNested)