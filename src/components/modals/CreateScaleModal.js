import React from 'react'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
    getAvailableScaleDegrees,
    getScales,
    isValidScaleDegreeArr,
    parseCommaSeparatedDegreeString,
    postScale
} from "../../services";

const CreateScaleModal = ({isOpen, onClose, setScales}) => {

    const onFormSubmit = async (e) => {
        e.preventDefault()
        const degrees = parseCommaSeparatedDegreeString(e.target.degrees.value)

        if (!isValidScaleDegreeArr(degrees)) {
            alert('Invalid degree string detected.')
            return
        }

        const {message} = await postScale({degrees, name: e.target.name.value})
        if (message) {
            alert(message)
        } else {
            setScales(await getScales())
            onClose()
        }

    }

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create scale</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onFormSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Scale Name: </Form.Label>
                        <Form.Control required type="text" name="name"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Scale degrees (comma-separated list): </Form.Label>
                        <Form.Control required type="text" placeholder="e.g. 1, b3, 5, b7" name="degrees"/>
                    </Form.Group>
                    <span className="text-secondary">Available degrees: {getAvailableScaleDegrees().join(', ')}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default CreateScaleModal