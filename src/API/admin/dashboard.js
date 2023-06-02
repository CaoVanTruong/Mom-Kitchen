export function getAllOrder() {
    return fetch('https://momkitchen.azurewebsites.net/api/Order/getallorder').then(res => res.json())
}