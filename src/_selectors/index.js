import { createSelector } from 'reselect'
import { pythagoras } from '../_helpers'


const peoplesGetter = (state) => state.peoples
const editIdAndValueGetter = (state) => ({ id: state.editor.id, value: state.editor.value })
const gridGetter = (state) => state.gridContent


const defaultPeople = {
	name: '',
	date: '',
	tags: []
}

export const editPeopleSelector = createSelector(peoplesGetter, editIdAndValueGetter, gridGetter, (peoples, {id, value}, content) => {
	// debugger
	if(!value)
		return { ...defaultPeople, date: content[id].date }

	const people = peoples.filter(item => item.value==value)[0]
	const tags = people.tags.map(tag => ({ value: tag.id, label: tag.value }))
	return { ...people, tags }
})

export const gridPeopleSelector = createSelector(peoplesGetter, gridGetter, (peoples, content) => {
	const gridPeoples = Object.keys(content).map(id => {
		const { empty, date, value } = content[id]
		switch(true) {
			case !!(empty && date):
				return { empty, ...pythagoras.calculate(date), value, id }

			case !!empty:
				return { empty, id }

			case !!date:
				return { ...pythagoras.calculate(date), value, id }

			case !!value:
				const { name, date: _date } = peoples.find(people => people.value == value)
				return { ...pythagoras.calculate(_date), value, id, name }
		}
	})
	gridPeoples.composeDigit = pythagoras.composeDigit
	return gridPeoples
})

// gc is gridContent
export const getCreationId = createSelector(gridGetter, (gc) => {
    return Object.keys(gc).find(item => gc[item].empty)
})

// gc is gridContent
export const getIdsByValue = (value) => createSelector(gridGetter, (gc) => {
	return Object.keys(gc).filter(item => gc[item].value && gc[item].value == value)
})
