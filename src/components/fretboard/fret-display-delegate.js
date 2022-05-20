import {getNoteByFret, getNoteSymbol, degreeToSemitones} from "../../services";
import {DisplayMode} from "./Fretboard";

export function createAllNotesDisplayDelegate(degrees, rootNote, displayMode, altSym = 'b') {

    return (str, fr) => {
        const note = getNoteByFret(str, fr)
        const matchedDegree = degrees.find((d) => note === (degreeToSemitones(d) + rootNote) % 12)

        if (matchedDegree) {
            const isRoot = matchedDegree === '1'
            switch (displayMode) {
                case DisplayMode.DEGREES:
                    return {sym: matchedDegree, isRoot}
                case DisplayMode.NOTES:
                    return {sym: getNoteSymbol(note, altSym), isRoot}
                default:
                    throw new Error('Unknown display mode.')
            }
        }

    }
}

export function createSelectedFretsDisplayDelegate(fingerings, displayMode, altSym = 'b') {
    return (str, fr) => {
        const matchedFingering = fingerings.find((f) => f.string === str && f.fret === fr)

        if (matchedFingering) {
            const isRoot = matchedFingering.degree === '1'
            switch (displayMode) {
                case DisplayMode.DEGREES:
                    return {sym: matchedFingering.degree, isRoot}
                case DisplayMode.NOTES:
                    return {sym: getNoteSymbol(getNoteByFret(str, fr), altSym), isRoot}
                default:
                    throw new Error('Unknown display mode.')
            }
        }

    }
}
