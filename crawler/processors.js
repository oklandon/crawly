const { URL } = require('./scrape-queue')

const processInit = {
    [URL]: redis => job => {
        // is this where the scrape will occure????
        console.log(job)
    }
}

module.exports = processInit

