import * as Tone from 'tone'
import {getNoteSymbol, getNoteWithOctave, stringifyNoteWithOctave} from "./note-service";

//create a guitar and connect it to the main output (your speakers)
const guitar = new Tone.Sampler({
    urls: {
        A2: "A2.mp3",
        A3: "A3.mp3",
        A4: 'A4.mp3',
    },
    baseUrl: "/assets/sounds/"
})

const reverb = new Tone.Reverb({decay: 0.5}).toDestination()

guitar.connect(reverb)

export function testAudio() {
    return playGuitarChord(
        [{string: 1, fret: 3},
            {string: 2, fret: 3},
            {string: 3, fret: 5},
            {string: 4, fret: 5},
            {string: 5, fret: 3}],
        100
    )
}

export function playSingleNote(note) {
    guitar.triggerAttackRelease(stringifyNoteWithOctave(note), "2n")
}

async function wait(timeIntervalMs) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeIntervalMs);
    });
}

export async function playGuitarChord(fingerings, timeIntervalMs = 100) {
    for (let i = fingerings.length - 1; i >= 0; --i) {
        const f = fingerings[i]
        guitar.triggerAttackRelease(
            stringifyNoteWithOctave(getNoteWithOctave(f.string, f.fret)),
            "1n"
        )
        await wait(timeIntervalMs)
    }
}

export async function playSequence(notes, root, octaveRepeats = 1, timeIntervalMs = 200) {
    const baseOctave = 3
    for (let i = 0; i < octaveRepeats; ++i) {
        for (let j = 0; j < notes.length; ++j) {
            const note = notes[j] + root
            const octavesAbove = Math.floor(note / 12)
            guitar.triggerAttackRelease(
                getNoteSymbol(note % 12, '#') + (i + baseOctave + octavesAbove),
                "2n"
            )
            await wait(timeIntervalMs)
        }
    }
}