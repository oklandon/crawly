const router = require('express').Router()
const { create, getById } = require('../dbconnect/scrape-connect')

router.post('/scrape', async (req, res) => {
    const newScrape = await create(
        req.body.url,
        req.user.twitterId
    )

    if (newScrape) {
        res.send(
            newScrape
        )
    }
})

router.get('/scrape/:scrape_id', async (req, res) => {
    const scrapes = await getById(req.params.scrape_id)
    res.send(
        scrapes
    )
})

module.exports = router