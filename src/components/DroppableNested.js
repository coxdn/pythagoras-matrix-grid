import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd';
import DraggableNested from './DraggableNested'
import { getItemStyle, getListStyle, checkDropDisable } from '../helpers'

class DroppableNested extends Component {
    componentWillUpdate(nextProps) {
        // console.log(' --- componentWillUpdate 1')
    }

	render() {
		const { id: droppableId, state } = this.props

		return (
            <Droppable droppableId={droppableId} isDropDisabled={checkDropDisable({state, droppableId}) ? true : false}>
                {(provided, snapshot) => {
                    // console.log('snapshot', snapshot);
                    return (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(
                                snapshot.isDraggingOver,
                                provided
                            )}>
                            {state.items[droppableId].map((item, index) => {
                                // console.log('index:', index)
                                if (index >= state.boardHeight*2)
                                    return null;
                                return (
                                    <DraggableNested
                                    	item={item}
                                    	state={state}
                                    	index={index}
                                    	key={index}
                                    	droppableId={droppableId}>
                                    </DraggableNested>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
		)
	}
}

export default DroppableNested