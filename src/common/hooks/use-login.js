import {useState} from "react";
import {isLoggedIn, logout} from "../../services";

const useLogin = () => {
    const [isLogged, setLogged] = useState(isLoggedIn())

    return {
        isLogged,
        logout: () => {
            logout()
            setLogged(false)
        },
        updateLogin: () => {
            setLogged(isLoggedIn())
        }
    }
}

export default useLogin