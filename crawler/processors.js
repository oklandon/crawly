const { URL } = require('./scrape-queue')
const { update } = require('../dbconnect/scrape-connect')
const cheerio = require('cheerio')
const axios = require('axios')

const processInit = {
    [URL]: redis => async job => {
        if (job.url) {
            axios.get(url).then( resp => {
                const $dom = cheerio.load(resp.data)
                const body = $dom('body')

                if (body) {
                    //TODO make endpoint accept keywords so that this could be more specific
                    const scrapeData = JSON.stringify(body)
                    await update(twitterId, {scrapeData})
                }
            })

        }
    }
}

module.exports = processInit

