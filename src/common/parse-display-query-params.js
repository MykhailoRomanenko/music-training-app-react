
const parseDisplayQueryParams = (location) => {
    const params = new URLSearchParams(location.search)
    const res = {}
    if (params.get('root') && !isNaN(parseInt(params.get('root')))) {
        res.root = parseInt(params.get('root'))
    }
    if (params.get('alteration')) {
        res.alteration = decodeURIComponent(params.get('alteration'))
    }

    return res
}

export default parseDisplayQueryParams