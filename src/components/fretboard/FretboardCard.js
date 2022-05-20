import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {createAllNotesDisplayDelegate, createSelectedFretsDisplayDelegate} from "./fret-display-delegate";
import {degreeToSemitones, playGuitarChord, playSequence} from "../../services";
import Fretboard from "./Fretboard";

export const MusicalObjectType = Object.freeze(
    {
        SCALE: 0,
        CHORD_ARP: 1,
        CHORD_F: 2
    }
)

export const FretboardCard = ({dimensions, displayOpts, data, type, semitones}) => {

    const createDisplayDelegate = () => {
        switch (type) {
            case MusicalObjectType.CHORD_ARP:
            case MusicalObjectType.SCALE:
                return createAllNotesDisplayDelegate(
                    data,
                    displayOpts.root,
                    displayOpts.displayMode,
                    displayOpts.alteration)
            case MusicalObjectType.CHORD_F:
                return createSelectedFretsDisplayDelegate(
                    data,
                    displayOpts.displayMode,
                    displayOpts.alteration)
            default:
                throw new Error('Unsupported MusicalObjectType.')
        }
    }

    const createPlayHandler = (playIntervalMs = 200) => {
        return () => {
            switch (type) {
                case MusicalObjectType.SCALE:
                    playSequence([...semitones, 12], displayOpts.root, 1, playIntervalMs)
                    break
                case MusicalObjectType.CHORD_ARP:
                    playSequence(semitones, displayOpts.root, 2, playIntervalMs)
                    break
                case MusicalObjectType.CHORD_F:
                    playGuitarChord(data, playIntervalMs)
                    break
                default:
                    throw new Error('Unsupported MusicalObjectType.')
            }
        }
    }

    let isChordF = type === MusicalObjectType.CHORD_F

    return (
        <Card>
            <Card.Body>
                <Fretboard
                    dimensions={dimensions}
                    getDisplaySymbol={createDisplayDelegate()}
                />
            </Card.Body>
            <Card.Footer>
                <Button onClick={createPlayHandler(
                    isChordF ? 50 : 350
                )}>
                    {isChordF ? 'Strum' : 'Play'}
                </Button>
                {
                    isChordF &&
                    <Button style={{marginLeft: '10px'}} onClick={createPlayHandler(1)}>
                        Pluck
                    </Button>
                }
            </Card.Footer>
        </Card>
    )
}