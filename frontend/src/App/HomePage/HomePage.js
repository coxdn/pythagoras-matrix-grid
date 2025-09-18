import React from 'react'
import { NoCompactingGrid, GridInfoWrapper } from "../GridLayout"
import { PeoplesSearchWrapper } from "../PeoplesSearch"
import { userActions } from '../../_actions'

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getCurrent())
    }

    render() {
        return (
            <div className="col-md-6">
                <div id="layout">
                    <PeoplesSearchWrapper />
                    <GridInfoWrapper Layout={NoCompactingGrid} />
                </div>
            </div>
        )
    }
}

export { HomePage }