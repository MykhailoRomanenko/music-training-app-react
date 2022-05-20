import React from "react";
import Fret from "./Fret";

const String = ({dimensions, getDisplaySymbol, strNum}) => {

    const frets = []

    for (let i = 0; i < dimensions.fretCount; ++i) {
        const fretNum = i + dimensions.initFret
        frets.push(<Fret key={fretNum} fretNum={fretNum} strNum={strNum} getDisplaySymbol={getDisplaySymbol}/>)
    }

    return (
        <>
            <div className="string-container">
                {frets}
                <div className="string-image" style={{height: `${3+strNum/2}px`}}/>
            </div>
        </>
    )
}

export default String