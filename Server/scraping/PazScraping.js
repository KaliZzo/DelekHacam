const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const Paz = require("./../model/PazModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });

const url = "https://paz.co.il/filling-stations/fuel-prices/";
const DB = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Database Connected");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
};

async function scrapeAndSave() {
  try {
    await connectDB();

    console.log("Fetching page...");
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
      },
    });

    console.log("Parsing HTML...");
    const $ = cheerio.load(response.data);

    const pazData = {};

    // Adjust these selectors based on the actual structure of the Paz website
    $("table tr").each((i, element) => {
      const cells = $(element).find("td");
      if (cells.length >= 2) {
        const fuelType = $(cells[0]).text().trim();
        const price = $(cells[1]).text().trim();

        if (fuelType.includes("95")) pazData.Benzin95 = price;
        else if (fuelType.includes("98")) pazData.Benzin98 = price;
        else if (fuelType.includes("סולר")) pazData.Solar = price;
      }
    });

    console.log("Scraped data:", pazData);

    if (Object.keys(pazData).length === 0) {
      throw new Error(
        "No data was scraped. The page structure might have changed."
      );
    }

    const newPazData = new Paz(pazData);
    await newPazData.save();
    console.log("Data saved successfully in Paz collection");
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    await mongoose.connection.close();
  }
}

scrapeAndSave();
