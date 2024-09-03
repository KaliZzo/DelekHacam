const dorAlonScraper = require("./scraping/dorAlonScraping");
const sonolScraper = require("./scraping/SonolScraping");
// Import other scrapers

async function runAllScrapers() {
  await dorAlonScraper.scrapeAndSave();
  await sonolScraper.scrapeAndSave();
  // Run other scrapers
}

runAllScrapers();
