import React from 'react'
import useMusicalObjectLinkHandler from "../../common/hooks/use-musical-object-link-handler";
import {getNoteSymbol} from "../../services";
import '../../css/musical-item.css'

const MusicalItemLink = ({data, isScale, displayOpts = null}) => {
    const clickHandler = useMusicalObjectLinkHandler(data, isScale, displayOpts)
    const rootNoteSym = displayOpts && getNoteSymbol(displayOpts.root, displayOpts.alteration)

    let title = data.name + (isScale ? ' scale' : ' chord')
    if (rootNoteSym) {
        title = rootNoteSym + (isScale ? ' ' : '') + title
    }

    return (
        <span>
            <span className="link-primary" style={{cursor:'pointer'}} onClick={clickHandler}>{title}</span>
            {data.pos && `, chord is constructed on: ${data.pos.join(', ')}`}
        </span>
    )
}

export default MusicalItemLink