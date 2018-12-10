import { userConstants } from '../_constants';
import { userService } from '../_services';
import { userAlertActions } from './';
import { history } from '../_helpers';

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
                        dispatch(userAlertActions.error('Ошибка авторизации: неверный логин или пароль.'))
                    } else {
                        dispatch(success(user))
                        history.push('/')
                    }
                },
                error => {
                    dispatch(failure(error))
                    dispatch(userAlertActions.error(error))
                }
            )
    }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout()
    return { type: userConstants.LOGOUT }
}

function register(user) {
    return dispatch => {
        dispatch(request(user))

        userService.register(user)
            .then(
                user => { 
                    dispatch(success())
                    history.push('/login');
                    dispatch(userAlertActions.success('Успешная регистрация!'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(userAlertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getCurrent() {
    return dispatch => {
        dispatch(request())

        userService.getCurrent()
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(data) { return { type: userConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
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
            );
    }

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}