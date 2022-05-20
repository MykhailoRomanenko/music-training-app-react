import {getScales} from "../../services";

const useFetchScales = async () => {
    return async () => {
        const data = await getScales()

        console.log('Fetching scales...')
        return data
    }
}

export default useFetchScales