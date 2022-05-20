import {useEffect} from "react";
import parseDisplayQueryParams from "../parse-display-query-params";

const useDisplayOptionsQueryParams =  (location, displayOpts) => {
    useEffect(() => {
        const queryParams = parseDisplayQueryParams(location)
        if(!isNaN(queryParams.root)) {
            displayOpts.setRoot(queryParams.root)
        }
        if(queryParams.alteration) {
            displayOpts.setAlteration(queryParams.alteration)
        }

    }, [location]) //displayOpts is not in deps for purpose
}

export default useDisplayOptionsQueryParams