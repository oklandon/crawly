const { scrapeQueue }  = require('./crawler/scrape-queue')
const processInit = require('./crawler/processors')
const redis = require('./redis')

Object.entries(scrapeQueue).forEach(([name, queue]) => {
    console.log('listening to ' + name)
    queue.process(processInit[name](redis))
})