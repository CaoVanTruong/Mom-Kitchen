export const getRecentOrders = () => {
    return fetch('https://dummyjson.com/carts/1').then(res => res.json())
}
export const getAllProducts = () => {
    return fetch('https://dummyjson.com/products').then(res => res.json())
}
export const getAllUsers = () => {
    return fetch('https://dummyjson.com/users').then(res => res.json())
}



