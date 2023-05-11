export function getAllAccount(){
    return fetch('https://momkitchen.azurewebsites.net/api/Account/getallaccount').then((res)=>res.json())
}