import Note from "../common/notes";

function getAlteredNote(num, altSym) {
    switch (altSym) {
        case '#':
            return `${getNoteSymbol(num - 1)}${altSym}`
        case 'b':
            return `${getNoteSymbol(num + 1)}${altSym}`
        default:
            throw new Error(`Invalid alteration: ${altSym}.`)
    }
}

export const getNoteSymbol = (num, altSym = null) => {
    if (num < 0 || num > 11) {
        throw Error(`Unknown note: ${num}. 0-11 are accepted.`)
    }
    switch (num) {
        case 0:
            return 'C'
        case 2:
            return 'D'
        case 4:
            return 'E'
        case 5:
            return 'F'
        case 7:
            return 'G'
        case 9:
            return 'A'
        case 11:
            return 'B'
        default:
            return getAlteredNote(num, altSym)
    }
}

const openFretNotes = [
    {n:4, o:4},  //1
    {n:11, o: 3}, //..
    {n:7, o:3},
    {n:2, o: 3},
    {n:9, o: 2},
    {n: 4, o: 2}]

export const getNoteWithOctave = (str, fr) => {
    const openNote = openFretNotes[str - 1]
    return {
        n: (openNote.n + fr) % 12,
        o: Math.floor(openNote.o + (openNote.n +fr ) / 12)
    }
}

export const stringifyNoteWithOctave = (note) => {
    return `${getNoteSymbol(note.n, '#')}${note.o}`
}

export const getNoteByFret = (() => {
    const openStrings = [Note.E, Note.B, Note.G, Note.D, Note.A, Note.E]
    return (str, fr, offs=0) => {
        return (openStrings[str - 1] + fr + offs) % 12
    }
})()