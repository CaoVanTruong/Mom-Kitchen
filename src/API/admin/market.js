export function getAllSessionPackage(){
    return fetch('https://momkitchen.azurewebsites.net/api/Session/getallsessionpackage').then(response=>response.json())
}