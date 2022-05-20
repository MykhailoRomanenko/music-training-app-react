import React, {useContext, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {
    createDegreeString, createNoteString,
    createSemitoneString,
    degreeToSemitones,
    findMinAndMaxFrets,
    findScalesContainingSemitones,
    getChordById,
    getGuitarChords,
    getNoteSymbol,
    transposeFingerings
} from "../../services";
import ApplicationContext from "../../common/context/application-context";
import {Link, useLocation, useParams} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import OptionsButton from "../display-options/OptionsButton";
import useDisplayOptions from "../../common/hooks/use-display-options";
import DisplayOptionsPanel from "../display-options/DisplayOptionsPanel";
import {FretboardCard, MusicalObjectType} from "../fretboard/FretboardCard";
import MusicalItemLink from "../musical-items/MusicalItemLink";
import useDisplayOptionsQueryParams from "../../common/hooks/use-display-options-query-params";
import Button from "react-bootstrap/Button";
import LoginContext from "../../common/context/login-context";
import CreateGuitarChordModal from "../modals/CreateGuitarChordModal";


const ChordDetails = () => {
    const {id} = useParams()
    const {displayChord, setDisplayChord, scales} = useContext(ApplicationContext)
    const [guitarChords, setGuitarChords] = useState(null)
    const displayOpts = useDisplayOptions({})
    const [relatedScales, setRelatedScales] = useState([])
    const rootSymbol = getNoteSymbol(displayOpts.root, displayOpts.alteration)
    const location = useLocation()
    const [isModalOpen, setModalOpen] = useState(false)
    const {isLogged} = useContext(LoginContext)

    useDisplayOptionsQueryParams(location, displayOpts)

    useEffect(() => {
        const fetchChord = async () => {
            if (!displayChord) {
                setDisplayChord(await getChordById(id))
            }
        }
        fetchChord().catch(alert)
    }, [displayChord, id, setDisplayChord])

    useEffect(() => {
        if (!displayChord) {
            return
        }
        const fetchGuitarChords = async () => {
            const data = await getGuitarChords(displayChord._id)
            setGuitarChords(data)
        }
        fetchGuitarChords().catch(alert)
    }, [displayChord])


    useEffect(() => {
        if (scales) {
            setRelatedScales(findScalesContainingSemitones(scales, displayChord.semitones))
        }
    }, [displayChord, scales])


    function createFingeringComponents() {
        if (guitarChords.length === 0) {
            return (
                <div>No fingerings yet.</div>
            )
        }

        return guitarChords.map((guitarChord, i) => {
            const transposedFingerings = transposeFingerings(guitarChord.fingerings, displayOpts.root)

            const {min, max} = findMinAndMaxFrets(transposedFingerings)

            return (
                <Col lg={4} md={6} sm={12} key={i}>
                    <FretboardCard
                        dimensions={{initFret: min, fretCount: max - min + 1}}
                        type={MusicalObjectType.CHORD_F}
                        displayOpts={displayOpts}
                        data={transposedFingerings}
                    />
                </Col>
            )
        })
    }


    function createScalesByChordTypeComponents() {
        return relatedScales.map((scale) => {
            return (
                <MusicalItemLink key={scale._id} data={scale} isScale={true}/>
            )
        })
    }

    function createScalesByExactChordComponents() {
        const components = []
        relatedScales.forEach((scale) => {
            let subComponents = []
            scale.pos.forEach((p) => {
                subComponents.push(
                    <div key={`${scale._id}_${p}`}>
                        < MusicalItemLink
                            data={{...scale, pos: [p]}}
                            isScale={true}
                            displayOpts={{
                                root: (displayOpts.root - degreeToSemitones(p) + 12) % 12,
                                alteration: displayOpts.alteration
                            }}

                        />
                    </div>
                )
            })
            components.push(
                <p key={scale._id}>{subComponents}</p>
            )
        })
        return components
    }

    return (
        <Container className="content">

            <OptionsButton onClick={() =>
                displayOpts.setPanelOpen(!displayOpts.isPanelOpen)
            }/>

            {
                displayOpts.isPanelOpen &&
                <DisplayOptionsPanel
                    alteration={displayOpts.alteration}
                    displayMode={displayOpts.displayMode}
                    root={displayOpts.root}
                    onApply={displayOpts.onDisplayOptionsChange}
                />
            }

            <Breadcrumb>
                <Link className="breadcrumb-item" to="/">Home</Link>
                <Link className="breadcrumb-item" to="/chords">Chords</Link>
                <Breadcrumb.Item>{displayChord && displayChord.name}</Breadcrumb.Item>
            </Breadcrumb>

            <hr/>

            {
                displayChord &&
                (<>
                    <h1>{rootSymbol}{displayChord.name} chord</h1>

                    <br/>
                    <p>
                        Degrees: {createDegreeString(displayChord.degrees)}
                        <br/>
                        Semitonal structure: {createSemitoneString(displayChord.semitones)}
                        <br/>
                        Notes: {createNoteString(displayChord.semitones, displayOpts.root, displayOpts.alteration)}
                    </p>
                    <hr/>
                    <h3>Chord arpeggio:</h3>
                    <br/>

                    <FretboardCard
                        dimensions={{initFret: 0, fretCount: 16}}
                        displayOpts={displayOpts}
                        data={displayChord.degrees.map((d) => d.d)}
                        semitones={displayChord.semitones}
                        type={MusicalObjectType.CHORD_ARP}
                    />
                    <hr/>
                    <h3>Chord fingerings:</h3>
                    <br/>
                    {
                        isLogged &&
                        <>
                            <Button variant="link" style={{textDecoration: 'none'}}
                                    onClick={() => setModalOpen(true)}
                            >Add</Button>
                            <CreateGuitarChordModal chord={displayChord} onClose={() => setModalOpen(false)}
                                                    isOpen={isModalOpen} setGuitarChords={setGuitarChords}/>
                        </>
                    }
                    <br/>
                    <Row>
                        {guitarChords ? createFingeringComponents() : 'Loading...'}
                    </Row>
                    <hr/>

                    <h3>Scales containing the {displayChord.name} chord:</h3>
                    <br/>

                    <Row>
                        {scales ? createScalesByChordTypeComponents() : 'Loading...'}
                    </Row>
                    <hr/>

                    <h3>Scales containing the {rootSymbol}{displayChord.name} chord:</h3>
                    <br/>

                    <Row>
                        {scales ? createScalesByExactChordComponents() : 'Loading...'}
                    </Row>
                </>)
            }
        </Container>
    )
}

export default ChordDetails