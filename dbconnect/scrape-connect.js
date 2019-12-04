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
    return await Scrape.find({twitterId: id}).then(scrape => {
        return scrape
    })
}

const methods = {
    create,
    getById
}

module.exports = methods