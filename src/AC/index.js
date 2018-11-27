import { ADD_ITEM, UPDATE_LAYOUT } from '../constants'

export function addItem(content) {
    return {
        type: ADD_ITEM,
        payload: content,
        generateId: true
    }
}

export function updateLayout(layout) {
    return {
        type: UPDATE_LAYOUT,
        payload: layout
    }	
}