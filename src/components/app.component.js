import React, {useEffect, useState} from 'react'

export default function App(){
    const [shouldAuthenticate, setShould] = useState(false)
    const [user, setUser] = useState(null)
    const fetchConfig = {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        }
    }

    useEffect(() => {
        fetch('http://localhost:5000/auth/login/success', fetchConfig)
            .then(resp => {
                console.log('resp', resp)
                if (resp.status === 200) {
                    return resp.json()
                } else {
                    throw new Error('uh oh')
                }
            })
            .then( json => {
                console.log('json', json)
                setUser(
                    json.user
                )
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <a href='/auth/twitter'> 
             Sign in with Twitter???
            </a>
            <div>
                {user && JSON.stringify(user)}
            </div>
        </div>
    )
}