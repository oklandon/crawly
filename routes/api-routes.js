const router = require('express').Router()
const { create } = require('../dbconnect/scrape-connect')

router.post('/scrape', (req, res) => {
    const newScrape = create(
        req.body.url,
        req.user.twitterId
    )

    if (newScrape) {
        res.send(
            newScrape
        )
    }
})

module.exports = router