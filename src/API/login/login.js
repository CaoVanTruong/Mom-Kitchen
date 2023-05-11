export const registAccount = (props) => {
    const { account, password } = props
    fetch("https://momkitchen.azurewebsites.net/api/Registration/registration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(props)

    })
}
export const signIn = () => {
   return fetch("https://momkitchen.azurewebsites.net/api/Account/getallaccount").then((res) => res.json())
}
