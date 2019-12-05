const Queue = require('bull')

const URL = 'URL'

const scrapeQueue = {
    [URL]: new Queue(
        URL,
        process.env.REDIS_URL
    )
}

module.exports = {
    scrapeQueue,
    URL
}

