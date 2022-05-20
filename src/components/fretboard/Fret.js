import React from "react";
import {getNoteWithOctave, playSingleNote} from "../../services";

const Fret = ({fretNum, getDisplaySymbol, strNum}) => {
    const displaySymbol = getDisplaySymbol(strNum, fretNum)
    return (
        <div className={`fret ${fretNum === 0 ? " zero-fret" : ""}`}>
            {displaySymbol &&
                <div
                    className={'fret-highlighted' + (displaySymbol.isRoot ? ' root' : '')}
                    onClick={() => playSingleNote(getNoteWithOctave(strNum, fretNum))}
                >
                    <span className="note-symbol">{displaySymbol.sym}</span>
                </div>}
        </div>
    )
}

export default Fret