import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { history } from '../_helpers'
import { alertActions } from '../_actions'
import { PrivateRoute, LogoutButton } from './_components'
import { HomePage } from './HomePage'
import { LoginPage } from './LoginPage'
import { RegisterPage } from './RegisterPage'
import '../../css/bootstrap-modify.css'

// import { hot } from 'react-hot-loader'


class App extends React.Component {
    constructor(props) {
        super(props)

        const { dispatch } = props
        history.listen((/*location, action*/) => {
            // clear alert on location change
            dispatch(alertActions.clearAll())
        })
    }

    render() {
        const { _alert, dispatch, loggedIn, loaded } = this.props
        return (
            <Router history={history}>
                <div className="jumbotron">
                    <div className="container">
                      <Route path="/app.html" render={() => <LogoutButton />} />
                        <div className="col-sm-8 col-sm-offset-1">
                            {_alert.hasIn(["user", "class"]) &&
                                <div className={`alert ${_alert.getIn(["user", "class"])}`}>{_alert.getIn(["user", "message"])}</div>
                            }
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to="/login" />} />
                                <PrivateRoute path="/app.html" component={HomePage} dispatch={dispatch} loggedIn={loggedIn} loaded={loaded} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Redirect to="/login" />
                            </Switch>
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

// export { connectedApp as App }
export default connectedApp
// export default hot(module)(connectedApp)