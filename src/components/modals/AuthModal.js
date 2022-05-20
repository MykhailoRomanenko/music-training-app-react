import React, {useContext} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {login} from "../../services";
import LoginContext from "../../common/context/login-context";

const AuthModal = ({isOpen, onClose}) => {

    const {updateLogin} = useContext(LoginContext)

    const onFormSubmit = async (e) => {
        e.preventDefault()
        const {message} = await login({login: e.target.login.value, password: e.target.password.value})
        if (message) {
            alert(message)
        } else {
            onClose()
            updateLogin()
        }
    }

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Log in</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onFormSubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Login: </Form.Label>
                    <Form.Control required type="text" name="login"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Pass: </Form.Label>
                    <Form.Control required type="password" name="password"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" >Submit</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AuthModal