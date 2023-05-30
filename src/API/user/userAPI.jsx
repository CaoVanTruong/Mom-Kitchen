export function getAllSessionPackage() {
    return fetch('https://momkitchen.azurewebsites.net/api/Session/getallsessionpackagewithstatuson', {
        method: 'GET',
    }).then(res => res.json())
}
export function getFoodPackageById({id}) {
    return fetch('https://momkitchen.azurewebsites.net/api/FoodPackage/getallfoodpackagebyid?foodpackageid='+id, {
        method: 'GET'
    }).then(res => res.json())
}
export function getDishByFoodPackageId({id}){
    return fetch('https://momkitchen.azurewebsites.net/api/FoodPackage/getalldishbyid?dishid='+id, {
        method: 'GET'
    }).then(res => res.json())
}