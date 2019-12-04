const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrapeSchema = new Schema({
  twitterId: String,
  scrapeData: String,
},{
    timestamps: true
});

const Scrape = mongoose.model("scrape", scrapeSchema);

module.exports = Scrape;