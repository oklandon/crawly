const Scrape = require('../models/scrape-model')

async function create(url, twitterId){
    const newScrape = await new Scrape({
        scrapeData:'',
        twitterId
    }).save()

    return newScrape
}

const methods = {
    create
}

module.exports = methods