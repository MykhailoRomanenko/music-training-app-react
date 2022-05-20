import React, {useState} from "react";
import '../../css/display-options-panel.css'
import Form from "react-bootstrap/Form";
import {getNoteSymbol} from "../../services";
import Card from 'react-bootstrap/Card'
import {Button} from "react-bootstrap";
import {DisplayMode} from "../fretboard/Fretboard";

const DisplayOptionsPanel = (props) => {

    const [selectedAlt, setSelectedAlt] = useState(props.alteration)

    const options = []

    for (let i = 0; i < 12; ++i) {
        options.push(
            <option key={i} value={i}>{getNoteSymbol(i, selectedAlt)}</option>
        )
    }

    const onApply = (e) => {
        e.preventDefault()
        console.log(e.target.rootNote.value)
        console.log(e.target.displayModeRadio.value)

        props.onApply({
            root: parseInt(e.target.rootNote.value),
            alteration: selectedAlt,
            displayMode: e.target.displayModeRadio.value === 'degr' ? DisplayMode.DEGREES : DisplayMode.NOTES
        })
    }

    return (

        <Card className="display-options-panel">
            <Form onSubmit={onApply}>
                <Card.Body className="display-options-panel-body">
                    <Form.Group>
                        <label htmlFor="root-select">Root:</label>
                        <Form.Select name="rootNote" id="root-select" defaultValue={props.root}>
                            {options}
                        </Form.Select>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Check type="radio" name="displayModeRadio"
                                    label="Degrees" value="degr"
                                    defaultChecked={props.displayMode===DisplayMode.DEGREES}
                        />
                        <Form.Check type="radio" name="displayModeRadio" label="Flats" value="b"
                                    defaultChecked={props.displayMode===DisplayMode.NOTES && props.alteration === 'b'}
                                    onClick={() => setSelectedAlt('b')}/>
                        <Form.Check type="radio" name="displayModeRadio" label="Sharps" value="#"
                                    defaultChecked={props.displayMode===DisplayMode.NOTES && props.alteration === '#'}
                                    onClick={() => setSelectedAlt('#')}/>
                    </Form.Group>
                </Card.Body>
                <Card.Footer style={{textAlign: 'center'}}>
                    <Button type="submit">Apply</Button>
                </Card.Footer>
            </Form>
        </Card>
    )
}

export default DisplayOptionsPanel