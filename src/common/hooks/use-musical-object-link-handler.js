import {useContext} from "react";
import ApplicationContext from "../context/application-context";
import {useNavigate} from "react-router-dom";

const useMusicalObjectLinkHandler = (data, isScale, displayOpts = null) => {
    const {setDisplayScale, setDisplayChord} = useContext(ApplicationContext)
    const navigate = useNavigate()

    let urlParams = new URLSearchParams()

    if (displayOpts) {
        Object.keys(displayOpts).forEach((k) => {
            urlParams.set(k, encodeURIComponent(displayOpts[k]))
        })
    }

    return isScale
        ? () => {
            setDisplayScale(data)
            navigate(`/scales/${data._id}${urlParams && '/?' + urlParams.toString()}`)
        }
        : () => {
            setDisplayChord(data)
            navigate(`/chords/${data._id}${urlParams && '/?' + urlParams.toString()}`)
        }
}

export default useMusicalObjectLinkHandler