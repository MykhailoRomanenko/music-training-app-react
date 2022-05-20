import React from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'

const ConfirmationModal = ({text = "Are you sure?", onConfirm, onAbort}) => {

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{text}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onAbort}>Abort</Button>
                <Button variant="primary" onClick={onConfirm}>Confirm</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )
}