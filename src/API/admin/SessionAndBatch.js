export function getAllSession() {
    return fetch('https://momkitchen.azurewebsites.net/api/Session').then((res) => res.json())
}

export function createNewSession() {
    return fetch('https://momkitchen.azurewebsites.net/api/Session', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        })
    }).then((res) => res.json())
}

export function deleteSesion(id) {
    return fetch('https://momkitchen.azurewebsites.net/api/Session/' + id, {
        method: 'DELETE'
    }).then((res) => res.json())
}

export function getAllShipper() {
    return fetch('https://momkitchen.azurewebsites.net/api/Batch').then((res) => res.json())
}
export function getAllBatch() {
    return fetch('https://momkitchen.azurewebsites.net/api/Batch/getallbatch', {
        method: 'GET'
    }).then(res => res.json())
}

export function deleteBatch(id) {
    return fetch('https://momkitchen.azurewebsites.net/api/Batch?batchid=' + id, {
        method: 'DELETE',
    })
}
export function createNewBatch(status, sessionId) {
    return fetch('https://momkitchen.azurewebsites.net/api/Batch', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "status": status,
            "sessionId": sessionId
        })
    }).then(res => res.json())
}
