import React from 'react'
import { connect } from 'react-redux'
import { Message } from './Message'
import { PeoplesSearch } from './PeoplesSearch'
import { gridActions, alertActions } from '../../_actions'

class PeoplesSearchWrapper extends React.PureComponent {
    state = {
        count: 0,
        search: ''
    }

    handleSelected = (skip/*value*/, state/*, props*/) => {
        // take the clicked ID (aka "value") field from clicked element in react-select-search result list
        const value = state.clicked
        // and if ID of clicked element is not empty
        if(value)
            // dispatch it for add calculate to grid-layout
            this.props.gridAddByClick(value)
    }

    // this is one of functions that have been added to module react-select-search
    onInputChange = (value, options) => {
        this.setState({ search: value, count: options.length })
        // reaction on any change input value - first clearing all alerts relative to peoples block
        this.props.alertPeoplesClear()
    }
    
    // return false if we need to stop handle this event in module react-select-search
    onInputKeyPress = (ev) => {
        const { search, count } = this.state
        const char = ev.which || ev.keyCode
        // if pressed Enter
        if (char==13) {
            // if "search" contains only digits and dots AND empty search result
            if (checkInput({search}) && count==0) {
                // try to add entered value to the "search"-input
                this.props.gridAddByKeyPress(search)
                // abort continued processing of the event
                return false
            }
        }
        // 10 because pressed Ctrl+Enter
        if (char==10 && ev.ctrlKey) {
            // if "search" contains no characters other than numbers and dots
            if (checkInput({search})) {
                // try to add entered value to the "search"-input
                this.props.gridAddByKeyPress(search)
                // abort continued processing of the event
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
                    peoples={this.props.peoples}
                    handleSelected={this.handleSelected}
                    onInputChange={this.onInputChange}
                    onInputKeyPress={this.onInputKeyPress}
                />
            </div>
            )
    }
}

function checkInput({search}) {
    // when "search" contains any symbols besides digits and dots
    if (/[^\d.]/.test(search))
        return false
    return true
}


const mapStateToProps = state => ({
    peoples: state.peoples
})

const mapDispatchToProps = {
    gridAddByKeyPress: gridActions.addByKeyPress,
    gridAddByClick: gridActions.addByClick,
    alertPeoplesClear: alertActions.peoples.clear
}

const connectedPeoplesSearchWrapper = connect(mapStateToProps, mapDispatchToProps)(PeoplesSearchWrapper)
export { connectedPeoplesSearchWrapper as PeoplesSearchWrapper }