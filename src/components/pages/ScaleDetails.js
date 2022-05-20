import React, {useContext, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {
    compareDegreeStrings,
    createScaleDegreeString,
    createSemitoneString,
    degreeToSemitones,
    findSemitonesInDegreeSet,
    getNoteSymbol,
    getScaleById
} from "../../services";
import ApplicationContext from "../../common/context/application-context";
import {Link, useLocation, useParams} from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import DisplayOptionsPanel from "../display-options/DisplayOptionsPanel";
import OptionsButton from "../display-options/OptionsButton";
import useDisplayOptions from "../../common/hooks/use-display-options";
import {FretboardCard, MusicalObjectType} from "../fretboard/FretboardCard";
import Row from "react-bootstrap/Row";
import MusicalItemLink from "../musical-items/MusicalItemLink";
import useDisplayOptionsQueryParams from "../../common/hooks/use-display-options-query-params";
import LoginContext from "../../common/context/login-context";

const ScaleDetails = () => {
    const {id} = useParams()
    const {displayScale, setDisplayScale, scales, chords} = useContext(ApplicationContext)
    const displayOpts = useDisplayOptions({})
    const location = useLocation()


    useDisplayOptionsQueryParams(location, displayOpts)

    useEffect(() => {
        const fetchChord = async () => {
            if (!displayScale) {
                setDisplayScale(await getScaleById(id))
            }
        }
        fetchChord().catch(alert)
    }, [displayScale, id, setDisplayScale])

    function createRelatedComponents(scaleToLookIn, relatedData, isDataScales) {
        const degreeMap = findSemitonesInDegreeSet(scaleToLookIn.degrees, relatedData)
        const components = []
        degreeMap.forEach((val, key) => {
            const root = (degreeToSemitones(key) + displayOpts.root) % 12
            const valsToDisplay = val.filter(v => v._id !== scaleToLookIn._id)
            if (!valsToDisplay.length) {
                return
            }
            components.push(
                <div key={key}>
                    <br/>
                    <h5>Built on {key}:</h5>
                    <br/>
                    <Row>
                        {
                            valsToDisplay.map(v => {
                                return (
                                    <MusicalItemLink key={v._id} data={v} isScale={isDataScales}
                                                     displayOpts={{root: root, alteration: displayOpts.alteration}}/>)
                            })
                        }

                    </Row>
                </div>
            )
        })
        components.sort((c1, c2) => {
            return compareDegreeStrings(c1.key, c2.key)
        })
        return components
    }

    const createRelatedScaleComponents = () => {
        return createRelatedComponents(displayScale, scales, true)
    }

    const createRelatedChordComponents = () => {
        return createRelatedComponents(displayScale, chords, false)
    }


    return (
        <Container  className="content">

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
                <Link className="breadcrumb-item" to="/scales">Scales</Link>
                <Breadcrumb.Item>{displayScale && displayScale.name}</Breadcrumb.Item>
            </Breadcrumb>

            <hr/>

            {
                displayScale &&
                (<>
                    <h1>{getNoteSymbol(displayOpts.root, displayOpts.alteration)} {displayScale.name} scale</h1>
                    <br/>

                    <p>
                        Degrees: {createScaleDegreeString(displayScale.degrees)}
                        <br/>
                        Semitonal structure: {createSemitoneString(displayScale.semitones)}
                        <br/>
                        Notes: {displayScale.semitones.map((s) => getNoteSymbol((s + displayOpts.root) % 12, displayOpts.alteration)).join(', ')}
                    </p>
                    <hr/>

                    <h3>Scale fingerings:</h3>
                    <br/>
                    <FretboardCard
                        dimensions={{initFret: 0, fretCount: 16}}
                        type={MusicalObjectType.SCALE}
                        data={displayScale.degrees}
                        semitones={displayScale.semitones}
                        displayOpts={displayOpts}
                    />
                    <hr/>

                    <h3>Related scales:</h3>
                    {scales ? createRelatedScaleComponents() : 'Loading...'}
                    <hr/>
                    <h3>Chords built on degrees:</h3>
                    {chords ? createRelatedChordComponents() : 'Loading...'}
                </>)
            }

        </Container>
    )
}

export default ScaleDetails