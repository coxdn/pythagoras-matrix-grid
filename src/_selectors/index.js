import { createSelector } from 'reselect'
import { pythagoras } from '../_helpers'


const peoplesGetter = state => state.peoples.items
const editIdAndValueGetter = state => ({ id: state.editor.id, value: state.editor.value })
const gridGetter = state => state.gridContent


const defaultPeople = {
	name: '',
	date: '',
	tags: []
}

export const editPeopleSelector = createSelector(peoplesGetter, editIdAndValueGetter, gridGetter, (peoples, {id, value}, content) => {
	// debugger
	if(!value)
		return {...defaultPeople, date: content[id].date}

	const people = peoples.filter(item => item.value==value)[0]
	const tags = people.tags.map(tag => ({ value: tag.id, label: tag.value }))
	return {...people, tags}
})

export const gridPeopleSelector = createSelector(peoplesGetter, gridGetter, (peoples, content) => {
	const gridPeoples = Object.keys(content).map(id => {
		const { empty, date, value } = content[id]
		switch(true) {
			case !!(empty && date):
				return {empty, ...pythagoras.calculate(date), value, id}

			case !!empty:
				return {empty, id}

			case !!date:
				return {...pythagoras.calculate(date), value, id}

			case !!value:
				const { name, date: _date } = peoples.filter(people => people.value==value)[0]
				return {...pythagoras.calculate(_date), value, id, name}
		}
	})
	gridPeoples.composeDigit = pythagoras.composeDigit
	return gridPeoples
})

export const getCreationId = createSelector(gridGetter, (content) => {
    const filtered = Object.keys(content).filter(item => content[item].empty)
    return filtered.length ? filtered[0] : false
})
