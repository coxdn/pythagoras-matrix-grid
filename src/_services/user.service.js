// import { authHeader } from '../_helpers';

const remoteServerAjax = '/ajax.php';
const urls = {
    login: `${remoteServerAjax}?login`,
    register: `${remoteServerAjax}?register`,
    delete: `${remoteServerAjax}?delete`,
    logout: `${remoteServerAjax}?logout`,
    getCurrent: `${remoteServerAjax}?getCurrent`,
}


export const userService = {
    login,
    logout,
    register,
    getCurrent,
    getById,
    // update,
    delete: _delete
}


function login(username, password) {
    const requestOptions = {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data='+JSON.stringify({ username, password })
    }
    // console.log('--- userService.login', JSON.stringify({ username, password }))

    return fetch(`${urls.login}`, requestOptions)
        .then(response => handleResponse(response))
        .then(user => {
            // login successful if there's a "id" in the response
            if (user.id) {
                // localStorage.setItem('user', JSON.stringify(user))
            }

            return user
        })
}

function logout() {
    // remove user from local storage to log user out
    // console.log('--- logout', authHeader())
    // localStorage.removeItem('user');
    const requestOptions = {
        method: 'GET',
        // headers: authHeader()
    }

    return fetch(`${urls.logout}`, requestOptions).then(handleResponse)
}

function getCurrent(fromPage) {
    const requestOptions = {
        method: 'GET',
        credentials: 'same-origin',
        // headers: authHeader()
    };

    return fetch(`${urls.getCurrent}&${fromPage}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if(user == null || user == false) {
                logout()
                location.reload(true)
            }

            return user
        })
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        // headers: authHeader()
    }

    return fetch(`/users/${id}`, requestOptions).then(handleResponse)
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data='+JSON.stringify(user)
    }

    return fetch(`${urls.register}`, requestOptions)
        .then(response => handleResponse(response))
        .then(user => {
            // autologin successful if there's a "id" in the response
            if (user.id) {
                delete user.message
                delete user.error
                localStorage.setItem('user', JSON.stringify(user))
            }

            return user
        })
}

/*function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);;
}*/

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data='+JSON.stringify({ id })
    }

    return fetch(`${urls.delete}`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true)
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        return data
    });
}