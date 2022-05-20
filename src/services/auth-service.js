import {addJsonHeader} from "./util/utils";
import {API_URL} from "../config";
import {isExpired} from "react-jwt";

export const login = async (data) => {
    const opts = {
        method: 'post',
        body: JSON.stringify(data)
    }
    addJsonHeader(opts)
    return fetch(`${API_URL}auth/login`, opts)
        .then(
            async (res) => {
                if (res.ok) {
                    localStorage.setItem('jwt', (await res.json()).jwt)
                    return {message: ''}
                }
                return {message: (await res.json()).message}
            }
        ).catch(err => {
                return {message: err.message}
            }
        )
}

export const logout = () => {
    localStorage.removeItem('jwt')
}

export const isLoggedIn = () => {
    const jwt = localStorage.getItem('jwt')
    return jwt && !isExpired(jwt)
}