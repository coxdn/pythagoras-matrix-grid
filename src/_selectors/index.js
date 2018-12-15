import {createSelector} from 'reselect'
import {pythagoras} from '../_helpers'

const configGetter = state => state.layoutConfig.layout

const peoplesGetter = state => state.peoples
const editIdGetter = state => state.value

const commentsGetter = state => state.comments.entities
const idGetter = (state, props) => props.id

export const modalSelector = createSelector(peoplesGetter, editIdGetter, (peoples, id) => {
	return peoples.filter(item => item.value==id)[0]
})

export const contentSelector = createSelector(configGetter, contentGetter, (config, content) => {
    const {selected, dateRange: {from, to}} = filters

    return mapToArr(articles).filter(article => {
        const published = Date.parse(article.date)
        return (!selected.length || selected.includes(article.id)) &&
            (!from || !to || (published > from && published < to))
    })
})

// export const commentSelectorFactory = () => createSelector(commentsGetter, idGetter, (comments, id) => {
//     return comments.get(id)
// })