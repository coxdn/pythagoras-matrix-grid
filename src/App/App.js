import React from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { history } from '../_helpers'
import { alertActions } from '../_actions'
import { PrivateRoute, LogoutButton } from './_components'
import { HomePage } from './HomePage'
import { LoginPage } from './LoginPage'
import { RegisterPage } from './RegisterPage'

import '../../css/bootstrap-modify.css'

class App extends React.Component {
    constructor(props) {
        super(props)

        const { dispatch } = props
        history.listen((location, action) => {
            console.log('--- history.listen', location, action)
            // clear alert on location change
            dispatch(alertActions.clearAll())
        })
    }

    render() {
        const { _alert, dispatch, loggedIn, loaded } = this.props
        // console.log(' ----- @@@', this.props)
        return (
            <Router history={history}>
                <div className="jumbotron">
                    <div className="container">
                        <Route path="/app.html" component={LogoutButton} />
                        <div className="col-sm-8 col-sm-offset-1">
                            {_alert.hasIn(["user", "class"]) &&
                                <div className={`alert ${_alert.getIn(["user", "class"])}`}>{_alert.getIn(["user", "message"])}</div>
                            }
                            <div>
                                <PrivateRoute path="/app.html" component={HomePage} dispatch={dispatch} loggedIn={loggedIn} loaded={loaded} />
                                <Route path="/login" component={LoginPage} loggedIn={loggedIn} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

const connectedApp = connect(state => {
    const { _alert, authentication: { loggedIn, loaded } } = state
    return {
        loggedIn,
        loaded,
        _alert
    }
})(App)
export { connectedApp as App }