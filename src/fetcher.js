const fetchConfig = {
    method: "GET",
    credentials: "include",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
    }
}

const fetcher = (url, data={}) => fetch(url, {...fetchConfig, ...data})

module.exports = fetcher

