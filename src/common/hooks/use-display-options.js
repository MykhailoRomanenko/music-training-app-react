import {useState} from "react";
import {DisplayMode} from "../../components/fretboard/Fretboard";

const useDisplayOptions = ({initRoot = 0, initAlteration = 'b', initMode = DisplayMode.DEGREES}) => {
    const [displayMode, setDisplayMode] = useState(initMode)
    const [alteration, setAlteration] = useState(initAlteration)
    const [root, setRoot] = useState(initRoot)
    const [isPanelOpen, setPanelOpen] = useState(false)
    const onDisplayOptionsChange = (values) => {
        setDisplayMode(values.displayMode)
        setAlteration(values.alteration)
        setRoot(values.root)
        setPanelOpen(false)
    }
    return {
        displayMode,
        setDisplayMode,
        alteration,
        setAlteration,
        root,
        setRoot,
        isPanelOpen,
        setPanelOpen,
        onDisplayOptionsChange
    }
}

export default useDisplayOptions