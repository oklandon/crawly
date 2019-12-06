const Scrape = require('../models/scrape-model')
const { scrapeQueue, URL } = require('../crawler/scrape-queue')

async function create(url, twitterId){
    const newScrape = await new Scrape({
        scrapeData:'',
        twitterId,
        url
    }).save()

    try {
        scrapeQueue[URL].add(newScrape)
    } catch (err) {
        console.log(err)
    }

    return newScrape
}

async function getById(id){
    return await Scrape.find({twitterId: id}).then(scrape => {
        return scrape
    })
}

async function update(id, set){
    return await Scrape.update(
        {twitterId: id},
        {
            $set: set
        }
    )
}

const methods = {
    create,
    getById
}

module.exports = methods