import React from 'react'
import { connect } from 'react-redux'
import { Message } from './Message'
import { PeoplesSearch } from './PeoplesSearch'
import { gridActions, peoplesActions, alertActions } from '../../_actions'

class PeoplesSearchWrapper extends React.Component {
    state = {
        count: null,
        search: ''
    }
    // defaultState = {...this.state}

    handleSelected = (skip/*value*/, state, props) => {
        const value = state.clicked
        if(value) this.props.dispatch(gridActions.addSelected(value))
        // this.setState(this.defaultState)
    }

    onInputChange = (value, options) => {
        // console.log('--- onInputChange', value, options, this)
        // const firstValue = options.length ? options[0].value : 0
        this.setState({ search: value, count: options.length })
        this.props.dispatch(alertActions.peoples.clear())
    }
    
    // return false if you need to stop handle this event
    onInputKeyPress = (ev) => {
        // if (ev.toString() == "[object Object]") return
        const { search, count } = this.state
        const char = ev.which || ev.keyCode
        // console.log('--- PeoplesSearch.onInputKeyPress', ev, ev.ctrlKey, char)
        if (char==13) {
            if (checkInput({search}) && count==0) {
                this.props.dispatch(peoplesActions.addToGrid(search.trim()))
                return false
            }
        }
        if (char==10 && ev.ctrlKey) {
            if (checkInput({search})) {
                this.props.dispatch(peoplesActions.addToGrid(search.trim()))
                return false
            }
        }
        return true
    }

    render() {
        const { search, count } = this.state
		return (
            <div>
                <Message search={search} count={count} />
                <PeoplesSearch
                    handleSelected={this.handleSelected}
                    onInputChange={this.onInputChange}
                    onInputKeyPress={this.onInputKeyPress}
                />
            </div>
            )
    }
}

function checkInput({search, count}) {
    let text = ""
    if (/[^\d\.]/.test(search))
        return false
    return true
}


const connectedPeoplesSearchWrapper = connect(null)(PeoplesSearchWrapper)
export { connectedPeoplesSearchWrapper as PeoplesSearchWrapper }