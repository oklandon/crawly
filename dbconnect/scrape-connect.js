const Scrape = require('../models/scrape-model')

async function create(url, twitterId){
    const newScrape = await new Scrape({
        scrapeData:'',
        twitterId,
        url
    }).save()

    return newScrape
}

async function getById(id){
    let scrapeData
    Scrape.find({twitterId: id}).then(scrape => {
        scrapeData = scrape
    })

    return scrapeData
}

const methods = {
    create,
    getById
}

module.exports = methods