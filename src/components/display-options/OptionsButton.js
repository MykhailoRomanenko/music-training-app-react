import React from "react";
import '../../css/options-button.css'


const OptionsButton = (props) => {

    return (
        <button className="options-button" onClick={props.onClick}><i className="fa fa-gear fa-2x"/></button>
    )
}

export default OptionsButton