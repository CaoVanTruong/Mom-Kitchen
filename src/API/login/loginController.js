import { useState } from "react";
import { signIn } from "./login";
export function Authenticate({array},account, password) {
    let role = 0
    let boolean = false
    array.forEach((element) => {
        if ((element.email === account) && (element.password === password)) {
            role = element.roleId
            localStorage.setItem("user-infor",element.email)
        } else {
            role = 0
        }
    });
    console.log("role lay ve dc la " + role)
    return role 
}
