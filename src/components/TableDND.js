import React, {Component} from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux'
import DroppableNested from './DroppableNested'
import { getItems, reorder, move, getItemStyle } from '../helpers'


class TableDND extends Component {
    constructor(props) {
        super(props)
        this.state = {
            boardHeight: 5,
            hideElem: false
        };
        this.state = {
            ...this.state,
            ...getItems(3, this.state.boardHeight, 3, 0)
        }
        window.state = this.state
    }

    id2List = {
        "d0": "d0",
        "d1": "d1",
        "d2": "d2"
    }

    getList = (id, itemsFlag) =>
        itemsFlag ? this.state.items[this.id2List[id]] : this.state.hidden[this.id2List[id]]

    onDragEnd = result => {
        // console.log('ondrugend result', result)
        const { source, destination } = result

        // dropped outside the list
        if (!destination) return

        if (source.droppableId === destination.droppableId) {
            console.log('--- source', source, 'destination', destination)
            const items = reorder(
                this.getList(source.droppableId, true),
                source.index,
                destination.index
            )
            const hidden = reorder(
                this.getList(source.droppableId, false),
                source.index,
                destination.index
            )

            const droppableId = source.droppableId
            state = { 
                items: { ...this.state.items, [droppableId]: items },
                hidden: { ...this.state.hidden, [droppableId]: hidden }
            }

            // console.log('state', state)
            // console.log('this.state', this.state)
            this.setState(state)
            // console.log('this.state 22', this.state)
        } else {
            // console.log('---', 2)
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            )

            // console.log(' ----- result', result)

            this.setState({
                items: {
                    ...this.state.items,
                    ...result
                }
            })
        }
    }

    componentWillUpdate(nextProps) {
        console.log(' --- componentWillReceiveProps')
    }

    handleDragUpdate = index => ev => {
        // ev.preventDefault()
        console.log('--- handleDragUpdate', ev, ev.destination?ev.destination.index:'null')
        if(!ev.destination) return
        console.log('--- this.state.items', this.state.items)
        const dst = ev.destination
        const src = ev.source
        const dstId = dst.droppableId
        const srcId = src.droppableId
        const items = this.state.items
        const dstItems = items[dstId]
        const maxRows = this.state.boardHeight

        console.log('--- ?? this.props', this.props)

        if(srcId == dstId) {
            this.props.hideElement();
            if(dstItems.filter(item => !item.opacity).length == maxRows) return
            if(dst.index>src.index) return
            return
            const dstIndexAbs = (dst.index-src.index/2)*2
            console.log('____no____', dst.index, src.index, dstIndexAbs, dstItems[dstIndexAbs])
            if(dstItems[dstIndexAbs].opacity) {
                const state = {
                    hidden: {
                        ...this.state.hidden,
                        [dstId]: Array.from(this.state.hidden[dstId]).map((item, k) =>
                            k==dstIndexAbs ? {...item, hidden: true} : item)
                    }
                }
                console.log('--- @@@ setState state', state)
                this.setState({hideElem: true})
                // this.setState(state)
            }
            // const hideIndexNear = dstItems.map((item, index) => {
            //     const hideIndex = item.hide ? index : false
            //     return index < dst.index ? false : hideIndex
            //     }).filter(item => typeof item == "number")[0]
            // console.log('--- items', items)
            // console.log('--- state', this.state)

            // if(false) {
            //     this.setState({
            //         hidden: {
            //             "d0": this.state.hidden.d0,
            //             "d1": this.state.hidden.d1,
            //             "d2": this.state.hidden.d2.slice(0, 4).concat([!this.state.hidden.d2[4]])
            //         }
            //     })
            // }
            return 
        }
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        window.state = this
        // console.log('--- this.state 3', this.state)
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
                onDragUpdate={this.handleDragUpdate(0)}>
                <DroppableNested
                    key = {0}
                    id = {'d0'}
                    state = {this.state}>
                </DroppableNested>
                <DroppableNested
                    key = {1}
                    id = {'d1'}
                    state = {this.state}>
                </DroppableNested>
                <DroppableNested
                    key = {2}
                    id = {'d2'}
                    state = {this.state}>
                </DroppableNested>
            </DragDropContext>
        );
    }
}
const hideElement = () => ({
    type: 'HIDE_ELEMENT'
})

const showElement = () => ({
    type: 'SHOW_ELEMENT'
})

export default connect(null, { hideElement, showElement })(TableDND)