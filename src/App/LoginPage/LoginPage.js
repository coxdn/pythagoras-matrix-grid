import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { userActions } from '../../_actions'

class LoginPage extends React.Component {
    state = {
        username: '',
        password: '',
        submitted: false
    }

    handleChange = ev => {
        const { name, value } = ev.target
        this.setState({ [name]: value })
    }

    handleSubmit = ev => {
        ev.preventDefault()

        this.setState({ submitted: true })
        const { username, password } = this.state
        const { dispatch } = this.props
        if (username && password) {
            dispatch(userActions.login(username, password))
        }
    }

    demoAutoLogin = ev => {
        ev.preventDefault()
        const { dispatch } = this.props
        dispatch(userActions.login('Demo', 'Demo'))
    }

    componentDidMount() {
        this.props.dispatch(userActions.getCurrent())
    }

    render() {
        const { loggingIn } = this.props
        const { username, password, submitted } = this.state
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Авторизация</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Имя пользователя</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Введите имя пользователя</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Пароль</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Введите пароль</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Вход</button><span>  </span>

                        <button className="btn btn-primary" onClick={this.demoAutoLogin}>Demo</button>
                        <Link to="/register" className="btn btn-link">Регистрация</Link>
                        {loggingIn &&
                            <img style={{'marginLeft': '5px'}} src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, loggedIn } = state.authentication
    return {
        loggingIn,
        loggedIn
    }
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage)
export { connectedLoginPage as LoginPage }