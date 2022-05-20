import {getChords} from "../../services";

const useFetchChords = async (setChords) => {
    return async () => {
        const data = await getChords()
        console.log('Fetching chords...')
        return data
    }
}

export default useFetchChords