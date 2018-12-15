import React from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { history } from '../_helpers'
import { alertUserActions } from '../_actions'
import { PrivateRoute, LogoutButton } from './_components'
import { HomePage } from './HomePage'
import { LoginPage } from './LoginPage'
import { RegisterPage } from './RegisterPage'

import '../../css/bootstrap-modify.css'

class App extends React.Component {
    constructor(props) {
        super(props)

        const { dispatch } = props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertUserActions.clear())
        })
    }

    render() {
        const { _alert, dispatch } = this.props
        // console.log(' ----- @@@', this.props)
        return (
            <Router history={history}>
                <div className="jumbotron">
                    <div className="container">
                        <PrivateRoute exact path="/app.html" component={LogoutButton} />
                        <div className="col-sm-8 col-sm-offset-1">
                            {_alert.authMessage &&
                                <div className={`alert ${_alert.type}`}>{_alert.authMessage}</div>
                            }
                            <div>
                                <PrivateRoute exact path="/app.html" component={HomePage} dispatch={dispatch} />
                                <Route path="/login" component={LoginPage} />
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
    const {_alert} = state
    return {
        _alert
    }
})(App)
export { connectedApp as App }