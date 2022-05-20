import {API_URL} from "../config";
import {jsonPostWithAuth} from "./util/utils";
import {degreeToSemitones} from "./degree-service";

const url = API_URL + 'scales/'

export const getScales = async () => {
    const data = await (await fetch(url)).json()
    data.sort((a, b) => a.name.localeCompare(b.name))
    return data
}

export const getScaleById = async (id) => {
    return (await fetch(url + id)).json()
}


export const postScale = (data) => {
    return jsonPostWithAuth(url, data)
}

export const findSemitonesInDegreeSet = (degrees, scaleOrChordData) => {
    const degreeMap = new Map() // key: degree, value: list of data that can be built from it
    const semitones = degrees.map(d => degreeToSemitones(d))
    const semitonesSet = new Set(semitones);

    scaleOrChordData.forEach((item) => {

        for (let i = 0; i < semitones.length; ++i) {
            const scaleHasChord = item.semitones.every((d) =>
                semitonesSet.has((d + semitones[i]) % 12),
            );

            const degree = degrees[i]
            if (scaleHasChord) {
                // add degree, on which chord is built in the scale
                if (degreeMap.has(degree)) {
                    degreeMap.get(degree).push(item)
                } else {
                    degreeMap.set(degree, [item])
                }
            }
        }
    })

    return degreeMap
}