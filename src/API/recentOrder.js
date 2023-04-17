export const getRecentOrders = () => {
    return fetch('https://dummyjson.com/carts/1').then(res => res.json())
}
export const getAllProducts = () => {
    return fetch('https://dummyjson.com/products').then(res => res.json())
}
// export const getAllUsers = () => {
//     try {
//         const response = fetch('https://randomuser.me/https://momkitchen.azurewebsites.net/api/User/getalluser/', {
//             method: 'GET',
//             headers: {
//                 accept: 'application/json',
//             },
//         });
//         if (!response.ok) {
//             throw new Error(`Error! status: ${response.status}`);
//         }
//         //   const result = response.then(res => res.json)
//         return response.then(res => res.json)
//     } catch (err) {
//         console.log(err);
//     }
// }

