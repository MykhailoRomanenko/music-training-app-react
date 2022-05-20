import React, {useContext, useState} from 'react';
import AuthModal from "./modals/AuthModal";
import useLogin from "../common/hooks/use-login";
import LoginContext from "../common/context/login-context";

const Footer = () => {
    const [isModalOpen, setModalOpen] = useState(false)
    const {isLogged, logout} = useContext(LoginContext)
    return (
        <div className="footer bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>Created by Mykhailo Romanenko</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>
                            {
                                isLogged
                                    ? <span className="footer-btn" onClick={logout}>Log out</span>
                                    : <span className="footer-btn"
                                            onClick={() => {
                                                setModalOpen(true)
                                            }}
                                    >Log in</span>
                            }
                        </p>
                    </div>
                </div>
            </div>
            <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>
        </div>
    )
}

export default Footer