function addHeader(opts, header) {
    if(!opts.headers) {
        opts.headers  = {}
    }
    opts.headers[header.k] = header.v
}


export function addJsonHeader(reqOpts) {
    addHeader(reqOpts, {k: 'Content-Type', v :  'application/json'})
}

export function addAuthHeader(reqOpts) {
    addHeader(reqOpts, {k: 'Authorization', v :  `Bearer ${localStorage.getItem('jwt')}`})
    console.log(reqOpts)
}

export const jsonPostWithAuth = async (url, data) => {
    const opts = {method: 'post', body: JSON.stringify(data)}
    addJsonHeader(opts)
    addAuthHeader(opts)
    return fetch(`${url}`, opts)
        .then(async (res) => {
                if (res.ok) {
                    return {message: ``}
                }
                return {message: (await res.json()).message}
            }
        ).catch(err => {
            return {message: err.message}
        })
}