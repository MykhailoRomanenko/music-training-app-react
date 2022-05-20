import React from 'react'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
    getAvailableChordDegrees,
    getChords,
    isValidChordDegreeArr,
    parseCommaSeparatedDegreeString,
    postChord
} from "../../services";

const CreateChordModal = ({isOpen, onClose, setChords}) => {

    const onFormSubmit = async (e) => {
        e.preventDefault()
        const degrees = parseCommaSeparatedDegreeString(e.target.degrees.value)

        if (!isValidChordDegreeArr(degrees)) {
            alert('Invalid degree string detected.')
            return
        }
        const chordDegrees = degrees.map((d) => {
            return {d: d}
        })

        if (e.target.omitDegrees.value) {
            const omitDegrees = parseCommaSeparatedDegreeString(e.target.omitDegrees.value)
            chordDegrees.forEach(d => {
                const omit = omitDegrees.includes(d.d)
                if (omit) {
                    d.omit = omit
                }
            })
        }

        const {message} = await postChord({degrees: chordDegrees, name: e.target.name.value})
        if (message) {
            alert(message)
        } else {
            setChords(await getChords())
            onClose()
        }

    }

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create chord</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onFormSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Chord Name: </Form.Label>
                        <Form.Control required type="text" name="name"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Chord degrees (comma-separated list): </Form.Label>
                        <Form.Control required type="text" placeholder="e.g. 1, b3, 5, b7" name="degrees"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Omittable degrees (comma-separated list): </Form.Label>
                        <Form.Control type="text" placeholder="e.g. 5, ..." name="omitDegrees"/>
                    </Form.Group>
                    <span className="text-secondary">Available degrees: {getAvailableChordDegrees().join(', ')}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default CreateChordModal