import React from 'react'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
    getChords, getGuitarChords,
    isValidGuitarFingeringsArr,
    parseCommasSeparatedFingeringsString,
    postGuitarChord
} from "../../services";

const CreateGuitarChordModal = ({isOpen, onClose, setGuitarChords, chord}) => {

    const onFormSubmit = async (e) => {
        e.preventDefault()
        const fingerings = parseCommasSeparatedFingeringsString(e.target.fingerings.value)

        console.log(fingerings)

        if (!isValidGuitarFingeringsArr(fingerings, chord)) {
            alert('Invalid fingerings (front)')
            return
        }

        const {message} = await postGuitarChord({fingerings, chord: chord._id})
        if (message) {
            alert(message)
        } else {
            setGuitarChords(await getGuitarChords(chord._id))
            onClose()
        }

    }

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create new {chord.name} chord fingering</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onFormSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Chord fingerings (comma-separated list): </Form.Label>
                        <Form.Control required type="text" placeholder="x, 3, 4, 3, 4, x" name="fingerings"/>
                    </Form.Group>
                    <p className="text-secondary">Enter 6 comma-separated values denoting frets for each string from 6 to 1 relatively to the root C.
                        If the string is not fretted, write 'x' on its place.
                        </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default CreateGuitarChordModal