import React from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { history } from '../_helpers'
import { userAlertActions } from '../_actions'
import { PrivateRoute, LogoutButton } from '../_components'
import { HomePage } from './HomePage'
import { LoginPage } from './LoginPage'
import { RegisterPage } from './RegisterPage'

import '../../css/bootstrap-modify.css'

class App extends React.Component {
    constructor(props) {
        super(props)

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(userAlertActions.clear())
        })
    }

    render() {
        const { alert } = this.props
        return (
            <Router history={history}>
                <div className="jumbotron">
                    <div className="container">
                        <PrivateRoute exact path="/" component={LogoutButton} />
                        <div className="col-sm-8 col-sm-offset-1">
                            {alert.authMessage &&
                                <div className={`alert ${alert.type}`}>{alert.authMessage}</div>
                            }
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
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

function mapStateToProps(state) {
    const { alert } = state
    return {
        alert
    }
}

const connectedApp = connect(mapStateToProps)(App)
export { connectedApp as App }