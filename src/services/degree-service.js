import {getNoteSymbol} from "./note-service";

const delim = ' - '

export const createDegreeString = (degrees) => {
    return degrees.map((d) => d.d).join(delim)
}

export const createScaleDegreeString = (degrees) => {
    return degrees.join(delim)
}

export const createSemitoneString = (semitones) => {
    return semitones.join(delim)
}

export const createNoteString = (semitones, root, alteration) => {
    return semitones.map((s) => getNoteSymbol((s + root) % 12, alteration)).join(', ')
}

function createDegreeMap() {
    const degreeMap = new Map();
    degreeMap.set('1', 0);
    degreeMap.set('b2', 1);
    degreeMap.set('2', 2);
    degreeMap.set('#2', 3);
    degreeMap.set('b3', 3);
    degreeMap.set('3', 4);
    degreeMap.set('4', 5);
    degreeMap.set('#4', 6);
    degreeMap.set('b5', 6);
    degreeMap.set('5', 7);
    degreeMap.set('#5', 8);
    degreeMap.set('b6', 8);
    degreeMap.set('6', 9);
    degreeMap.set('b7', 10);
    degreeMap.set('7', 11);
    degreeMap.set('b9', 1);
    degreeMap.set('9', 2);
    degreeMap.set('#9', 3);
    degreeMap.set('11', 5);
    degreeMap.set('#11', 6);
    degreeMap.set('b13', 8);
    degreeMap.set('13', 9);
    return degreeMap;
}

const degreeMap = createDegreeMap();

export const degreeToSemitones = (degree) => {
    const degreeData = degreeMap.get(degree);
    if (degreeData === undefined) {
        throw new Error('Unknown degree');
    }
    return degreeData;
}

export const getAvailableChordDegrees = () => {
    return [...degreeMap.keys()]
}

export const getAvailableScaleDegrees = () => {
    return [...degreeMap.keys()].filter(d => isValidScaleDegreeString(d))
}

export const isValidChordDegreeString = (degree) => {
    return degreeMap.has(degree);
}

function getDegreeNumber(degree) {
    if (degree.startsWith('#') || degree.startsWith('b')) {
        return parseInt(degree.substring(1));
    }
    return parseInt(degree);
}

export const isValidScaleDegreeString = (degree) => {
    return degreeMap.has(degree) && getDegreeNumber(degree) < 8;
}


export function compareDegreeStrings(d1, d2) {
    const n1 = getDegreeNumber(d1);
    const n2 = getDegreeNumber(d2);
    if (n1 === n2) {
        if (d1.startsWith('#')) {
            return 1;
        }
        if (d2.startsWith('b')) {
            return 1;
        }
        if (d1.startsWith('b')) {
            return -1;
        }
        return -1; // d2 is either # or non-altered
    }
    return n1 - n2;
}

export function parseCommaSeparatedDegreeString(str) {
    return str.split(',').map((val) => val.trim())
}

export function isValidChordDegreeArr(arr) {
    return arr.every(isValidChordDegreeString)
}

export function isValidScaleDegreeArr(arr) {
    return arr.every(isValidScaleDegreeString)
}

