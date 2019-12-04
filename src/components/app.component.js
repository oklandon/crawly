import React, {useEffect, useState} from 'react'
import Crawly from './crawly.component.js'
import fetcher from '../fetcher.js'

export default function App(){
    const [user, setUser] = useState(null)
    useEffect(() => {
        fetcher('http://localhost:5000/auth/login/success')
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json()
                } else {
                    throw new Error('uh oh')
                }
            })
            .then( json => {
                setUser(
                    json.user
                )
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <main>
            { user
                ? 
                    <Crawly user={user}/>
                : 
                    <a href='/auth/twitter'> 
                        Sign in with Twitter???
                    </a>
            }
        </main>
    )
}