import {API_URL} from "../config";
import {jsonPostWithAuth} from "./util/utils";
import {getNoteByFret} from "./note-service";
import {degreeToSemitones} from "./degree-service";

const url = API_URL + 'guitar-chords/'

export const getGuitarChords = async (chordId) => {
    return (await fetch(`${url}?chord=${chordId}`)).json()
}

export const postGuitarChord = (data) => {
    return jsonPostWithAuth(url, data)
}

export const findMinAndMaxFrets = (fingerings) => {
    const res = {min: fingerings[0].fret, max: fingerings[0].fret}
    fingerings.forEach(
        (elem) => {
            if (res.min > elem.fret) {
                res.min = elem.fret
            }
            if (res.max < elem.fret) {
                res.max = elem.fret
            }
        }
    )
    return res
}

const moveFret = (n, lowestFret, newRoot) =>
    (lowestFret + newRoot) % 12 >= lowestFret
        ? n + newRoot
        : n - (12 - newRoot);

export const transposeFingerings = (fingerings, newRoot) => {
    const transposedFingerings = []
    const initialMin = findMinAndMaxFrets(fingerings).min

    fingerings.forEach((f) => {
        transposedFingerings.push({...f, fret: moveFret(f.fret, initialMin, newRoot)})
    })

    return transposedFingerings
}

function fretsTooFarApart(arr) {
    const {min, max} = findMinAndMaxFrets(arr)

    return max - min > 8
}

export const isValidGuitarFingeringsArr = (arr, chord) => {
    if (!arr
        || arr.length < 3
        || arr.length > 6
        || arr.some((f) => isNaN(f.fret))
        || fretsTooFarApart(arr)
    ) {
        return false
    }
    let validFingerings = 0
    const semitonesFromFrets = arr.map((f) => getNoteByFret(f.string, f.fret))
    chord.degrees.forEach((degree) => {
        const included = semitonesFromFrets.includes(degreeToSemitones(degree.d))
        if (!degree.omit && !included) {
            return false
        }
        if (included) {
            ++validFingerings
        }
    })
    const omittableDegreesCount = chord.degrees.reduce((acc, e) => {
        return e.omit ? acc + 1 : acc
    }, 0)
    console.log(omittableDegreesCount)
    console.log(validFingerings >= chord.degrees.length - omittableDegreesCount)
    return (validFingerings === arr.length && validFingerings >= chord.degrees.length - omittableDegreesCount)
}

export const parseCommasSeparatedFingeringsString = (str) => {
    const res = []
    const fingeringsSplit = str.split(',')
    if (fingeringsSplit.length !== 6) {
        return null
    }
    fingeringsSplit.forEach((f, i) => {
        const token = f.trim()
        if (token !== 'x') {
            res.push({string: 6 - i, fret: parseInt(token)})
        }
    })
    return res
}