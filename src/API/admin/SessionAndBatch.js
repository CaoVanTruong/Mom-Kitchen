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

