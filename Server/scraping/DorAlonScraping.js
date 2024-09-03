const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const dorAlon = require("../model/DorAlonModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });

const url = "https://www.doralon.co.il/fuels-price/";
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

    const dorAlonData = {};

    $(".pt__item").each((index, element) => {
      const title = $(element).find(".pt__item-title").text().trim();
      const price = $(element).find(".pt__item-price").first().text().trim();

      if (title.includes("בנזין 95 בשירות עצמי")) {
        dorAlonData.Benzin95 = price;
      } else if (title.includes("בנזין 95") && title.includes("שירות מלא")) {
        dorAlonData.Benzin95FullService = price;
      } else if (title.includes("בנזין 98")) {
        dorAlonData.Benzin98 = price;
      } else if (title.includes("סולר תחבורה")) {
        dorAlonData.Solar = price;
      }
    });

    console.log("Scraped data:", dorAlonData);

    if (Object.keys(dorAlonData).length === 0) {
      throw new Error(
        "No data was scraped. The page structure might have changed."
      );
    }

    const newDorAlonData = new dorAlon(dorAlonData);
    await newDorAlonData.save();
    console.log("Data saved successfully in DorAlon collection");
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    await mongoose.connection.close();
  }
}

scrapeAndSave();
