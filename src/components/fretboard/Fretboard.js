import React from "react";
import String from "./String";
import '../../css/fretboard.css'

export const DisplayMode = Object.freeze({
    DEGREES: 0,
    NOTES: 1
})

const Fretboard = ({dimensions, getDisplaySymbol}) => {
    const strings = []
    for (let i = 1; i <= 6; ++i) {
        strings.push(
            <String key={i} strNum={i}
                    dimensions={dimensions}
                    getDisplaySymbol={getDisplaySymbol}/>
        )
    }
    const fretNumbers = []
    const {initFret, fretCount} = dimensions
    for (let i = initFret; i < initFret + fretCount; ++i) {
        fretNumbers.push(
            <div key={i} className={'fret' + (i === 0 ? ' zero-fret' : '') + ' no-guitar-styling'}>{i}</div>
        )
    }
    return (
        <div className="fretboard-wrapper">
            <div className="string-container">
                {fretNumbers}
            </div>
            <div className="fretboard">
                {strings}
            </div>
            <div className="string-container">
                {fretNumbers}
            </div>
        </div>
    )
}

export default Fretboard