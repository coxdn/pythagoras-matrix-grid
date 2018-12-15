const remoteServerAjax = '/ajax.php';
const urls = {
    save: `${remoteServerAjax}?save`,
    remove: `${remoteServerAjax}?removePeople`
}


export const editService = {
    save,
    remove
}

function save(content) {
    const requestOptions = {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data='+JSON.stringify(content)
    }
    // console.log('--- userService.login', JSON.stringify({ username, password }))

    return fetch(`${urls.save}`, requestOptions)
        .then(response => handleResponse(response))
        /*.then(json => {
            if (json.id) {
            }

            return json
        })*/
}

function remove(id) {
    const requestOptions = {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data='+JSON.stringify({ content })
    }
    // console.log('--- userService.login', JSON.stringify({ username, password }))

    return fetch(`${urls.remove}`, requestOptions)
        .then(response => handleResponse(response))
        .then(json => {
            if (json.id) {
            }

            return json
        })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        
        if (!response.ok) {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        return data
    })
}