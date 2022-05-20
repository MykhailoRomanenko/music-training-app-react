import {API_URL} from "../config";
import {jsonPostWithAuth} from "./util/utils";

const url = API_URL + 'chords/'

export const getChords = async () => {
    return (await fetch(url)).json()
}

export const getChordById = async (id) => {
    return (await fetch(url + id)).json()
}

export const getChordByName = async (name) => {
    return (await fetch(`${url}name/${name}`)).json()
}

export const postChord = (data) => {
    return jsonPostWithAuth(url, data)
}

export const findScalesContainingSemitones = (scales, semitones) => {
    const res = []
    scales.forEach((scale) => {
        const pos = []; // this will contain degrees, on which provided chord can be built in a scale
        const scaleDegreesSet = new Set(scale.semitones);

        // check if chord semitones are present relatively to each semitone in the scale
        for (let i = 0; i < scale.semitones.length; ++i) {
            const scaleHasChord = semitones.every((d) =>
                scaleDegreesSet.has((d + scale.semitones[i]) % 12),
            );

            if (scaleHasChord) {
                // add degree, on which chord is built in the scale
                pos.push(scale.degrees[i]);
            }
        }

        // if pos wasn't updated - scale doesn't have the chord
        if (pos.length) {
            res.push({...scale, pos})
        }
    })
    return res
}