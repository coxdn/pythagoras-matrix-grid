import { pythagoras } from './'
import { peoplesConstants } from '../_constants'

// function returns nearest free coordinates (X and Y) on grid layout, where we can add a new tile
export const getNearestFreeXY = (layout, cols) => {
    if(!layout.length) return {x: 0, y: 0}
    const maxY = Array.from(layout).sort((a, b) => a.y > b.y ? -1 : 1)[0].y
    for(let i in Array.from({length: (maxY+2)*cols})) {
        i = parseInt(i)
        const x = i%cols
        const y = i/cols|0
        if(!layout.filter(item => item.x==x && item.y==y).length)
            return {x, y}
    }
}

export const reSetPeoplesAttributes = (peoples) => {
    return peoples.map((people, index) => {
        if (!people.tagSearch && people.tags.length)
            people.tagSearch = people.tags.map(tag => tag.value).join(", ")
        people.index = index
        return people
    })
}

export const setPeoplesAges = (peoples) => {
    return peoples.map(people => {
        const age = pythagoras.getAge(people.date)
        if (age.digits < peoplesConstants.UPPER_LIMIT_AGE)
            people.age = age.format
        return people
    })
}
export const searchPeopleIndex = (peoples, value) => {
    let index = -1
    peoples
        .map((people, i) => ({value: people.value, i}))
        .some((people, i) => {
            if (people.value==value) {
                index = i
                return true
            }
            return false
        })
    return index
}

// gc is gridConfig
export const getIds = (gc, value) => {
    return Object.keys(gc).filter(item => gc[item].value && gc[item].value == value)
}