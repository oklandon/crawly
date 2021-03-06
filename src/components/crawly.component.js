import React, {useState, useEffect} from 'react'
import fetcher from '../fetcher.js'

export default function Crawly({user}) {
    const [search, updateSearch] = useState('')

    const submitScrape = e => {
        e.preventDefault()
        fetcher('http://localhost:5000/api/scrape', {
            method: 'POST',
            body: JSON.stringify({
                url: search
            })
        })
    }

    useEffect(() => {
        fetcher(`http://localhost:5000/api/scrape/${user.twitterId}`)
    },[user])

    return(
        <React.Fragment>
            <img src={user.profileImageUrl}/>
            <h2>{`hi ${user.name}`}</h2>
            <form onSubmit={submitScrape}>
                <label htmlFor="siteToCrawl">
                    What site to crawl?
                </label>
                <input type="text" value={search} onChange={e => updateSearch(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </React.Fragment>
    )
}