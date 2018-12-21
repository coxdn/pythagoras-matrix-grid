import { userConstants, peoplesConstants } from '../_constants'
import { userService } from '../_services'
import { alertActions } from './'
import { history } from '../_helpers'

export const userActions = {
    login,
    logout,
    register,
    getCurrent,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }))

        userService.login(username, password)
            .then(
                user => {
                    if(!user.loggedIn) {
                        dispatch(failure())
                        dispatch(alertActions.user.errorAuth('Ошибка авторизации: неверный логин или пароль.'))
                    } else {
                        // console.log('--- success')
                        dispatch(success(user))
                        history.push('/app.html')
                    }
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.user.errorAuth(error))
                }
            )
    }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, payload: { user } } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, payload: { user } } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, payload: { error } } }
}

function logout() {
    userService.logout()
    return { type: userConstants.LOGOUT }
}

function register(user) {
    let v = new Map();
    return dispatch => {
        dispatch(request(user))
        // console.log('--- user', user)
        userService.register(user)
            .then(
                response => {
                    if(response.error) {
                        dispatch(failure())
                        switch(response.message) {
                            case 'USER_EXISTS':
                                dispatch(alertActions.user.errorRegister('Такое имя пользователя уже занято'))
                                break;
                            case 'FORBIDDEN_CHARS':
                                dispatch(alertActions.user.errorRegister('Имя пользователя может содержать только латинские символы и цифры (A-z, 0-9)'))
                                break;
                            case 'UNKNOWN_ERROR':
                                dispatch(alertActions.user.errorRegister('Неизвестная ошибка'))
                                break;
                            
                        }
                        
                    } else {
                        dispatch(success(user.username))
                        dispatch(alertActions.user.success('Успешная регистрация!'))
                        const slowLogin = new Promise(function(resolve) {
                            setTimeout(resolve, 1500)
                        })
                        slowLogin.then(() => {
                            history.push('/app.html')
                        })
                    }
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.user.errorAuth(error))
                }
            )
    }

    function request(user) { return { type: userConstants.REGISTER_REQUEST, payload: { user } } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, payload: { user } } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, payload: { error } } }
}

// getting user auth info with full peoples array (if you logged in)
function getCurrent() {
    return dispatch => {
        userService.getCurrent(fromPage())
            .then(
                data => {
                    if (!data.user || !data.user.id) {
                        dispatch(loginFailure())
                        return
                    }
                    dispatch(success(data))
                    if (data.user && location.pathname!='/app.html')
                        history.push('/app.html')
                },
                error => dispatch(failure(error))
            )
    }

    function fromPage() {
        switch(location.pathname) {
            case '/login': return 'LoginPage'
            case '/register': return 'RegisterPage'
            case '/app.html': return 'HomePage'
        }
        return ''
    }

    function success(data) { return { type: peoplesConstants.GETALL_SUCCESS, payload: { ...data } } }
    function failure(error) { return { type: peoplesConstants.GETALL_FAILURE, payload: { error } } }
    function loginFailure() { return { type: userConstants.LOGIN_FAILURE } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id))

        userService.delete(id)
            .then(
                user => { 
                    dispatch(success(id))
                },
                error => {
                    dispatch(failure(id, error))
                }
            )
    }

    function request(id) { return { type: userConstants.DELETE_REQUEST, payload: { id } } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, payload: { id } } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, payload: { id, error } } }
}