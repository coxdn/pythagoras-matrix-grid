const remoteServerAjax = '/ajax.php';
const urls = {
    save: `${remoteServerAjax}?save`,
    remove: `${remoteServerAjax}?remove`
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

    return fetch(`${urls.save}`, requestOptions)
        .then(response => handleResponse(response))
}

function remove({id}) {
    console.log('--- edit.service id', id)
    const requestOptions = {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data='+JSON.stringify({ id })
    }

    return fetch(`${urls.remove}`, requestOptions)
        .then(response => handleResponse(response))
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